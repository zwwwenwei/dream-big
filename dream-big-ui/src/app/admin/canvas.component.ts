import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import words from '../../assets/words.json';
interface Point {
    x: number;
    y: number;
}

interface Polygon {
    points: Array<Point>;
    highlight: boolean;
    category: Category;
}

interface StarCoord {
    spike_x: number;
    spike_y: number;
    edge_x: number;
    edge_y: number;
}

interface Category {
    name: string;
    score: number;
    colour: string;
}

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html'
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas')
    canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
    public context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
    categories: Array<Category> = [];
    starSize: number = 20;
    centerX: number = 400;
    centerY: number = 250;
    rotation: number = 0;
    catPolygons: Array<Polygon> = [];
    firstPolygonIdx: number = -1;
    polygonCollision: boolean = false;
    numSpikes: number = 5;
    outerRatio: number = 8;
    innerRatio: number = 3;

    ngAfterViewInit(): void {
        this.context = this.canvas.nativeElement.getContext('2d')!;

        setTimeout(() => {
            this.createCategories();
            this.makeDrawStar(true);
        }, 0);
    }

    public createCategories() {
        this.categories = [];
        for (var i = 0; i < this.numSpikes; i++) {
            const cat = {
                name: words[this.getRandomNumberBetween(0, words.length - 1)],
                score: 10,
                colour: this.getRandomColourCode()
            }
            this.categories.push(cat);
        }
    }

    public changeSpikes() {
        this.createCategories();
        this.makeDrawStar(true);
    }

    public onMouseMove(e: any) {
        var collision = this.checkCatPolygonCollisions(e.offsetX, e.offsetY);
        if (collision) {
            this.makeDrawStar(false);
            this.drawText(e.offsetX, e.offsetY);
        }
    }

    // might be needed in the future?
    // private drawBox(x: number, y: number, height: number, width: number) {
    //     this.context.moveTo(x, y)
    //     this.context.beginPath()
    //     this.context.lineTo(x, y + height)
    //     this.context.lineTo(x+width, y+height)
    //     this.context.lineTo(x+width, y)
    //     this.context.lineTo(x, y)
    //     this.context.closePath();
    //     this.context.lineWidth = 3
    //     this.context.strokeStyle = 'black'
    //     this.context.stroke();
    //     this.context.fillStyle = 'white'
    //     this.context.fill();
    // }

    private drawText(x: number, y: number) {
        // this.drawBox(x+30, y+30, 40, 100);
        if (this.firstPolygonIdx < this.catPolygons.length && this.firstPolygonIdx > -1) {
            this.context.font = "20px Arial";
            this.context.fillStyle = 'black';
            this.context.fillText(`${this.catPolygons[this.firstPolygonIdx].category.name}`, 30, 30);
            this.context.fillText(`Score: ${this.catPolygons[this.firstPolygonIdx].category.score}`, 30, 55);
        }
    }

    private checkCatPolygonCollisions(x: number, y: number) {
        this.firstPolygonIdx = -1;
        for (var i = 0; i < this.catPolygons.length; i++) {
            const polygon = this.catPolygons[i];
            var is_inside = this.pointIsInPoly(x, y, polygon.points);
            if (is_inside) {
                this.catPolygons[i].highlight = true;
                this.firstPolygonIdx = i;
            } else {
                this.catPolygons[i].highlight = false;
            }
        }
        // use polygonCollision to ensure the cat polygons are redrawn the frame after collision stops.
        // this allows the polygons to update one final time, and clears the highlighted polygon
        if (this.firstPolygonIdx >= 0 || this.polygonCollision) {
            this.polygonCollision = this.firstPolygonIdx >= 0;

            return true;
        }
        return false;
    }

    public randomiseCatScores() {
        this.categories.forEach((cat) => {
            cat.score = this.getRandomNumberBetween(1, 100);
        })
        this.makeDrawStar(true);
    }

    public redrawStar() {
        this.makeDrawStar(true);
    }

    public makeDrawStar(hasChanged: boolean) {
        // clear the canvas so the star can be redrawn
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        // draw the star to the canvas and retrieve the points for all spikes and inner vertices
        let starCoords = this.drawStar(this.centerX, this.centerY, this.numSpikes, this.starSize * this.outerRatio, this.starSize * this.innerRatio);

        // check if the category polygons should be recreated
        if (hasChanged || this.catPolygons.length == 0) {
            this.catPolygons = [];
            this.getCatPolygons(starCoords);
        }

        // check if the mouse has collided with a polygon
        if (this.firstPolygonIdx >= 0) {
            // reorder the polygon array to ensure the one that has been collided with is last in the list (will be drawn ontop of the others)
            this.catPolygons = this.reorder(this.catPolygons, this.firstPolygonIdx+1);
        }

        this.drawCatPolygons();
    }

    private getCatPolygons(starCoords: Array<StarCoord>) {
        // each polygon connects to two inner vertices, but only has the values for one.
        // to get the opposite point of the inner vertex, use the value from the previous polygon in the list
        var prev_x = starCoords[starCoords.length - 1].edge_x;
        var prev_y = starCoords[starCoords.length - 1].edge_y;
        for (var i = 0; i < this.categories.length; i++) {
            var score = this.categories[i].score;

            // limit the score to be between 1-100 to ensure it can't escape the star shape
            score = Math.min(this.starSize * this.outerRatio / 100 * score, this.starSize * this.outerRatio / 100 * 100);

            // find the point which has a distance of score along the line defined by the center point of the star (c_x, c_y) and the point at the corresponding spike
            const p_xy = this.calculateLinePoint(this.centerX, this.centerY, starCoords[i].spike_x, starCoords[i].spike_y, score);

            // these points have been declared in a specific order, which is required to draw the polygon
            this.catPolygons.push({
                points: [
                    { x: this.centerX, y: this.centerY },
                    { x: starCoords[i].edge_x, y: starCoords[i].edge_y },
                    { x: p_xy.x, y: p_xy.y },
                    { x: prev_x, y: prev_y },
                ],
                highlight: false,
                category: this.categories[i]
            });
            prev_x = starCoords[i].edge_x;
            prev_y = starCoords[i].edge_y;
        }
    }


    private drawCatPolygons() {
        for (var i = 0; i < this.catPolygons.length; i++) {
            const poly = this.catPolygons[i];
            var start_x = poly.points[0].x;
            var start_y = poly.points[0].y;
            this.context.beginPath();
            this.context.moveTo(start_x, start_y);
            for (var j = 1; j < poly.points.length; j++) {
                this.context.lineTo(poly.points[j].x, poly.points[j].y);
            }
            this.context.lineTo(start_x, start_y);
            this.context.closePath();
            if (poly.highlight) {

                this.context.lineWidth = 5;
                this.context.strokeStyle = 'gold';

            } else {
                this.context.lineWidth = 1;
                this.context.strokeStyle = 'black';
            }

            this.context.stroke();
            this.context.fillStyle = poly.category.colour
            this.context.fill();
        }
    }


    private drawCircle(cx: number, cy: number, radius: number) {
        this.context.beginPath();
        this.context.arc(cx, cy, radius, 0, 2 * Math.PI, false);
        this.context.closePath()
        this.context.fillStyle = 'aliceblue';
        this.context.fill();
        this.context.lineWidth = 2;
        this.context.strokeStyle = 'midnightblue';
        this.context.stroke();
    }
    /**
     * 
     * @param cx 
     * @param cy 
     * @param spikes 
     * @param outerRadius 
     * @param innerRadius 
     * @returns starCoords
     */
    private drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number): Array<StarCoord> {

        this.drawCircle(cx, cy, outerRadius + 10);
        // use a ratio of 8:3 for outerRadius:innerRadius to get desired star shape
        var rotation_radians = this.rotation * Math.PI / 180;
        var rot = (Math.PI / 2 * 3) + rotation_radians;
        var x = cx + Math.cos(rot) * outerRadius;
        var y = cy + Math.sin(rot) * outerRadius;
        var step = Math.PI / spikes;

        this.context.strokeStyle = "black";
        this.context.beginPath();
        this.context.moveTo(x, y)
        const starCoords: StarCoord[] = [];

        for (var i = 0; i < spikes; i++) {
            let star_coord: StarCoord = {
                spike_x: 0,
                spike_y: 0,
                edge_x: 0,
                edge_y: 0,
            };

            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            star_coord.spike_x = x;
            star_coord.spike_y = y;
            this.context.lineTo(x, y)
            rot += step

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            star_coord.edge_x = x;
            star_coord.edge_y = y;
            this.context.lineTo(x, y)
            rot += step

            starCoords.push(star_coord);
        }
        this.context.closePath();
        this.context.lineWidth = 3;
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.fillStyle = 'lightgrey';
        this.context.fill();
        return starCoords;
    }

// --------------------------- FUNCTIONS BELOW COULD PROBABLY BE MOVED TO A HELPER FILE -----------------------

    /**
     * https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/17490923#17490923
     * @param x 
     * @param y 
     * @param polygonPoints 
     * @returns boolean
     */
    private pointIsInPoly(x: number, y: number, polygonPoints: Array<Point>): boolean {
        var isInside = false;
        var minX = polygonPoints[0].x, maxX = polygonPoints[0].x;
        var minY = polygonPoints[0].y, maxY = polygonPoints[0].y;
        for (var n = 1; n < polygonPoints.length; n++) {
            var q = polygonPoints[n];
            minX = Math.min(q.x, minX);
            maxX = Math.max(q.x, maxX);
            minY = Math.min(q.y, minY);
            maxY = Math.max(q.y, maxY);
        }

        if (x < minX || x > maxX || y < minY || y > maxY) {
            return false;
        }

        var i = 0, j = polygonPoints.length - 1;
        for (j; i < polygonPoints.length; j = i++) {
            if ((polygonPoints[i].y > y) != (polygonPoints[j].y > y) &&
                x < (polygonPoints[j].x - polygonPoints[i].x) * (y - polygonPoints[i].y) / (polygonPoints[j].y - polygonPoints[i].y) + polygonPoints[i].x) {
                isInside = !isInside;
            }
        }

        return isInside;
    }

    /**
     * Find the point on a line given by two coordinates that is distance units away from x1,y1
     * 
     * @param x1 x1 position on given line
     * @param y1 y1 position on given line
     * @param x2 x2 position on given line
     * @param y2 y2 position on given line
     * @param distance the distance to travel on the given line to find the desired point
     * @returns a point on the given line that is distance units along it
     */
    private calculateLinePoint(x1: number, y1: number, x2: number, y2: number, distance: number) {
        var vx = x2 - x1;
        var vy = y2 - y1;
        var mag = Math.sqrt(vx * vx + vy * vy);
        vx /= mag;
        vy /= mag;
        var px = x1 + vx * (distance);
        var py = y1 + vy * (distance);
        return { x: px, y: py }
    }

    private reorder(data: Array<any>, index: number) {
        return data.slice(index).concat(data.slice(0, index))
    };

    private getRandomColourCode() {
        var makeColorCode = '0123456789ABCDEF';
        var code = '#';
        for (var count = 0; count < 6; count++) {
            code = code + makeColorCode[Math.floor(Math.random() * 16)];
        }
        return code;
    }

    // private hexToRgb(hexCode: any, transparency = 1) {
    //     let c = hexCode;
    //     if (/^#([a-f0-9]{3}){1,2}$/.test(c)) {
    //         if (c.length == 4) {
    //             c = '#' + [c[1], c[1], c[2], c[2], c[3], c[3]].join('');
    //         }
    //         c = '0x' + c.substring(1);
    //         return 'rgb(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + `,${transparency})`;
    //     }
    //     return '';
    // }

    private getRandomNumberBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}