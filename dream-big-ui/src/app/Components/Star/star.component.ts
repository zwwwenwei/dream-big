import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Color, Path, Point, Project, PointText } from 'paper/dist/paper-core';
import { Category, Polygon, StarCoord } from './types';

@Component({
    selector: 'app-star',
    templateUrl: './star.component.html'
})
export class StarComponent implements AfterViewInit {
    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
    public project: any;
    public starPath: any;
    @Input() categories: Array<Category> = [];
    @Input() starSize: number = 20;
    @Input() centrePoint: any = { x: 400, y: 250 };
    @Input() rotation: number = 0;
    @Input() outerRatio: number = 8;
    @Input() innerRatio: number = 3;
    @Input() numSpikes: number = 5;

    @Input() minScore: number = 30;
    @Input() polygonFillColour: string = 'gold';

    catPolygons: Array<Polygon> = [];
    collidedPolygon: Polygon = {} as Polygon;
    polygonCollision: boolean = false;

    starCoords: Array<StarCoord> = [];

    textColour: string = 'black';
    textFont: string = 'Courier New'
    textSize: number = 25;

    ngAfterViewInit(): void {
        this.project = new Project(this.canvas.nativeElement);
        setTimeout(() => {
            this.drawScene(true);
        }, 0);
    }

    public onMouseMove(e: any) {
        // ensure the objects on the page have fully loaded before trying to perform logic
        if (this.starPath) {
            const mousePoint = new Point(e.offsetX, e.offsetY);
            this.catPolygons.forEach((poly) => {
                poly.highlight = poly == this.collidedPolygon;
            });
            this.getCollidedPolygon(mousePoint);

            setTimeout(() => {
                this.drawScene(false);
                this.drawText(mousePoint);
            }, 0);

        } else {
            this.polygonCollision = false;
        }

    }


    private getCollidedPolygon(xy: paper.Point) {
        this.collidedPolygon = {} as Polygon;
        for (var i = 0; i < this.catPolygons.length; i++) {
            if (this.catPolygons[i].path.contains(xy)) {
                this.collidedPolygon = this.catPolygons[i];
            }
        }
        // use a boolean variable to ensure the cat polygons are redrawn the frame after collision stops.
        // this allows the polygons to update one final time, and clears the highlighted polygon
        if (Object.entries(this.collidedPolygon).length || this.polygonCollision) {
            this.polygonCollision = !!Object.entries(this.collidedPolygon).length;
            return true;
        }
        return false;
    }

    private getPolygonIdx(polygon: Polygon) {        return this.catPolygons.findIndex(a => a == polygon);
    }

    private drawText(xy: paper.Point) {
        var polygon = this.collidedPolygon;

        if (Object.entries(polygon).length) {
            new PointText({
                point: [30, 30],
                content: `${polygon.category.name}\nScore: ${polygon.category.score}`,
                fillColor: this.textColour,
                fontFamily: this.textFont,
                fontWeight: 'bold',
                fontSize: this.textSize
            });
        }
    }

    public drawScene(hasChanged: boolean) {
        // clear the canvas so the star can be redrawn
        this.project.clear();
        this.drawCircle(this.starSize * this.outerRatio + 20);

        // draw the star to the canvas and retrieve the points for all inner and outer spikes points
        this.starCoords = this.drawStar(this.numSpikes);

        // check if the category polygons should be recreated
        if (hasChanged || this.catPolygons.length == 0) {
            this.catPolygons = this.getCatPolygons();
        }

        // check if the mouse has collided with a polygon
        if (!!Object.entries(this.collidedPolygon).length) {
            const collidedPolygonIdx = this.getPolygonIdx(this.collidedPolygon);
            // reorder the polygon array to ensure the one that has been collided with is last in the list (will be drawn ontop of the others)
            this.catPolygons = this.reorder(this.catPolygons, collidedPolygonIdx + 1);
        }

        this.drawCatPolygons();
        this.drawStarPointCategories();
    }
    private getCatPolygons() {
        let catPolygons: Polygon[] = [];
        var prevCategory = this.categories[this.categories.length - 1];

        for (var i = 0; i < this.categories.length; i++) {
            /**
             * need to calculate where to place the inner spikes of the inner star.
             * to do this, will draw a line from the centre of the star to an inner spike of the outer star
             * the inner star's inner spike point will be a point along this line.
             * scale category score to ensure it can never be larger than the outer star's spike length
             * it can then be used to find the point along the line which is the scaled score distance away from the centre point of the star
             * 
             * also need to inspect the previous and next categories, as this polygon will share an inner spike with each of them.
             * choose the inner spike locations by calculating the scores of the previous, current and future categories.
             * determine whether to use this polygon's inner spike length or the previous one by using the maximum value (do it for the future polygon as well)
             * 
             * then find the points along the lines towards the outer star's inner spikes. do this for the left and right inner spikes.
             */
            const nextCategory = i == this.categories.length - 1 ? this.categories[0] : this.categories[i + 1];
            const starCoord = this.starCoords[i];

            var score = this.categories[i].score + this.minScore;
            // the previous and next scores are retrieved to allow for the resizing of polygon edges
            var prevScore = prevCategory.score + this.minScore;
            var nextScore = nextCategory.score + this.minScore;

            // all scores must be scaled to fit within the star
            const scaledOuterScore = (this.starSize * this.outerRatio / 100) * score;
            const scaledInnerScore = (this.starSize * this.innerRatio / 100) * score;
            const scaledPrevInnerScore = (this.starSize * this.innerRatio / 100) * prevScore;
            const scaledNextInnerScore = (this.starSize * this.innerRatio / 100) * nextScore;

            var outerSpikeLength = Math.min(scaledOuterScore, this.starSize * this.outerRatio);

            // find all the possible inner spike lengths
            var innerSpikeLength = Math.min(scaledInnerScore, this.starSize * this.innerRatio);
            var prevInnerSpikeLength = Math.min(scaledPrevInnerScore, this.starSize * this.innerRatio);
            var nextInnerSpikeLength = Math.min(scaledNextInnerScore, this.starSize * this.innerRatio);

            // determine the max length between this polygon and its neighbours
            const maxEdgeLengthL = Math.max(prevInnerSpikeLength, innerSpikeLength);
            const maxEdgeLengthR = Math.max(nextInnerSpikeLength, innerSpikeLength)

            // calculate the points on the corresponding inner spike lines, using the maximum edge length for each inner spike
            const edgeL = this.calculateLinePoint(this.centrePoint.x, this.centrePoint.y, starCoord.edgeL.x, starCoord.edgeL.y, maxEdgeLengthL);
            const edgeR = this.calculateLinePoint(this.centrePoint.x, this.centrePoint.y, starCoord.edgeR.x, starCoord.edgeR.y, maxEdgeLengthR);
            const scoreXY = this.calculateLinePoint(this.centrePoint.x, this.centrePoint.y, starCoord.spike.x, starCoord.spike.y, outerSpikeLength);

            catPolygons.push({
                points: {
                    spike: new Point(scoreXY),
                    edgeR: new Point(edgeL),
                    edgeL: new Point(edgeR),
                    centre: this.centrePoint,
                },
                highlight: false,
                category: this.categories[i],
                path: {} as paper.Path,
            });
            prevCategory = this.categories[i];
        }
        return catPolygons;
    }

    private drawCatPolygons() {
        for (var i = 0; i < this.catPolygons.length; i++) {
            const poly = this.catPolygons[i];

            var polyPath = new Path();
            polyPath.moveTo(poly.points.centre);
            polyPath.lineTo(poly.points.edgeL);
            polyPath.lineTo(poly.points.spike);
            polyPath.lineTo(poly.points.edgeR);
            polyPath.lineTo(poly.points.centre);
            polyPath.closePath();

            polyPath.strokeWidth = 1;
            polyPath.strokeColor = new Color('black');

            if (poly.highlight) {
                polyPath.strokeWidth = 3;
                polyPath.strokeColor = new Color(poly.category.colour);
            }
            polyPath.fillColor = new Color(this.polygonFillColour);
            this.catPolygons[i].path = polyPath;
        }
    }

    private drawStarPointCategories() {
        for (var i = 0; i < this.starCoords.length; i++) {
            var spikePath = new Path();
            spikePath.moveTo(this.starCoords[i].edgeR);
            spikePath.lineTo(this.starCoords[i].spike);
            spikePath.lineTo(this.starCoords[i].edgeL);
            spikePath.strokeWidth = 6;
            spikePath.strokeColor = new Color(this.categories[i].colour);
        }
    }

    private drawStar(spikes: number): Array<StarCoord> {
        var outerRadius = this.starSize * this.outerRatio;
        var innerRadius = this.starSize * this.innerRatio;

        var rotationRadians = this.rotation * Math.PI / 180;
        var rot = (Math.PI / 2 * 3) + rotationRadians;
        var step = Math.PI / spikes;

        var starPath = new Path();

        var x = this.centrePoint.x + Math.cos(rot) * outerRadius;
        var y = this.centrePoint.y + Math.sin(rot) * outerRadius;

        starPath.add(new Point(x, y));

        var prevEdge = new Point(
            this.centrePoint.x + Math.cos(rot + (step * (spikes * 2 - 1))) * innerRadius,
            this.centrePoint.y + Math.sin(rot + (step * (spikes * 2 - 1))) * innerRadius
        );

        const starCoords: StarCoord[] = [];

        for (var i = 0; i < spikes; i++) {
            let starCoord: StarCoord = {
                spike: new Point({ x: 0, y: 0 }),
                edgeR: new Point({ x: 0, y: 0 }),
                edgeL: new Point({ x: 0, y: 0 }),
            };

            x = this.centrePoint.x + Math.cos(rot) * outerRadius;
            y = this.centrePoint.y + Math.sin(rot) * outerRadius;
            starCoord.spike.x = x;
            starCoord.spike.y = y;
            starPath.add(new Point(x, y));

            rot += step

            x = this.centrePoint.x + Math.cos(rot) * innerRadius;
            y = this.centrePoint.y + Math.sin(rot) * innerRadius;

            starCoord.edgeR.x = x;
            starCoord.edgeR.y = y;
            starCoord.edgeL = prevEdge;
            starPath.add(new Point(x, y));
            rot += step

            starCoords.push(starCoord);
            prevEdge = new Point(x, y)
        }

        starPath.closePath();
        starPath.strokeWidth = 1;
        starPath.strokeColor = new Color('black');
        this.starPath = starPath;
        return starCoords;
    }
    private drawCircle(radius: number) {
        var path = new Path.Circle(this.centrePoint, radius);
        path.strokeColor = new Color('midnightblue');
        path.fillColor = new Color('aliceblue');
        path.strokeWidth = 2
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
}