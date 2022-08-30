import { Component, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { Color, Path, Point, Project, PointText } from 'paper/dist/paper-core';
import { Category, Polygon, StarCoord } from './types';

@Component({
    selector: 'app-star',
    templateUrl: './star.component.html'
})
export class StarComponent implements AfterViewInit {
    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
    public context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;

    public project: any;
    public starPath: any;
    @Input() categories: Array<Category> = [];
    @Input() starSize: number = 20;
    @Input() centerPoint: any = { x: 400, y: 250 };
    @Input() rotation: number = 0;
    @Input() outerRatio: number = 8;
    @Input() innerRatio: number = 3;
    @Input() numSpikes: number = 5;

    @Input() minScore: number = 30;

    catPolygons: Array<Polygon> = [];
    collidedPolygon: Polygon = {} as Polygon;
    polygonCollision: boolean = false;

    starCoords: Array<StarCoord> = [];

    ngAfterViewInit(): void {
        this.project = new Project(this.canvas.nativeElement);
        setTimeout(() => {
            this.makeStarGraphic(true);
        }, 0);
    }

    public onMouseMove(e: any) {
        var collision = this.updatePolygonCollisions(new Point(e.offsetX, e.offsetY));
        if (collision) {
            this.makeStarGraphic(false);
            this.drawText(e.offsetX, e.offsetY);
        }
    }
    private getPolygonIdx(polygon: Polygon) {
        return this.catPolygons.findIndex(a => a == polygon);
    }

    private drawText(x: number, y: number) {
        var polygon = this.collidedPolygon;

        if (Object.entries(polygon).length) {
            new PointText({
                point: [30, 30],
                content: `${polygon.category.name}\nScore: ${polygon.category.score}`,
                fillColor: 'black',
                fontFamily: 'Courier New',
                fontWeight: 'bold',
                fontSize: 25
            });
        }
    }

    public makeStarGraphic(hasChanged: boolean) {
        // clear the canvas so the star can be redrawn
        this.project.clear();
        // draw the star to the canvas and retrieve the points for all inner and outer spikes
        // scale the star size by the set inner and outer ratio to retrieve the inner and outer radius of the star
        this.starCoords = this.drawStar(this.numSpikes,);

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
            var innerSpikeLength = Math.min(scaledInnerScore, this.starSize * this.innerRatio);
            var prevInnerSpikeLength = Math.min(scaledPrevInnerScore, this.starSize * this.innerRatio);
            var nextInnerSpikeLength = Math.min(scaledNextInnerScore, this.starSize * this.innerRatio);

            const scoreXY = this.calculateLinePoint(this.centerPoint.x, this.centerPoint.y, starCoord.spike.x, starCoord.spike.y, outerSpikeLength);

            const maxEdgeLengthL = Math.max(prevInnerSpikeLength, innerSpikeLength);
            const maxEdgeLengthR = Math.max(nextInnerSpikeLength, innerSpikeLength)
            const edgeL = this.calculateLinePoint(this.centerPoint.x, this.centerPoint.y, starCoord.edgeL.x, starCoord.edgeL.y, maxEdgeLengthL);
            const edgeR = this.calculateLinePoint(this.centerPoint.x, this.centerPoint.y, starCoord.edgeR.x, starCoord.edgeR.y, maxEdgeLengthR);

            catPolygons.push({
                points: {
                    spike: new Point(scoreXY),
                    edgeR: new Point(edgeL),
                    edgeL: new Point(edgeR),
                    centre: this.centerPoint,
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
            polyPath.fillColor = new Color('gold');
            this.catPolygons[i].path = polyPath;
        }
    }
    private updatePolygonCollisions(xy: paper.Point) {
        this.collidedPolygon = {} as Polygon;
        for (var i = 0; i < this.catPolygons.length; i++) {
            this.catPolygons[i].highlight = false;

            var is_inside = this.catPolygons[i].path.contains(xy);
            if (is_inside) {
                this.catPolygons[i].highlight = true;
                this.collidedPolygon = this.catPolygons[i];
            }
        }
        // use polygonCollision to ensure the cat polygons are redrawn the frame after collision stops.
        // this allows the polygons to update one final time, and clears the highlighted polygon
        if (Object.entries(this.collidedPolygon).length || this.polygonCollision) {
            this.polygonCollision = !!Object.entries(this.collidedPolygon).length;

            return true;
        }
        return false;
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
        this.drawCircle(this.starSize * this.outerRatio + 20);
        var outerRadius = this.starSize * this.outerRatio;
        var innerRadius = this.starSize * this.innerRatio;

        var rotation_radians = this.rotation * Math.PI / 180;
        var rot = (Math.PI / 2 * 3) + rotation_radians;
        var step = Math.PI / spikes;

        var starPath = new Path();

        var x = this.centerPoint.x + Math.cos(rot) * outerRadius;
        var y = this.centerPoint.y + Math.sin(rot) * outerRadius;

        starPath.add(new Point(x, y));

        var prevEdge = new Point(
            this.centerPoint.x + Math.cos(rot + (step * (spikes * 2 - 1))) * innerRadius,
            this.centerPoint.y + Math.sin(rot + (step * (spikes * 2 - 1))) * innerRadius
        );

        const starCoords: StarCoord[] = [];

        for (var i = 0; i < spikes; i++) {
            let star_coord: StarCoord = {
                spike: new Point({ x: 0, y: 0 }),
                edgeR: new Point({ x: 0, y: 0 }),
                edgeL: new Point({ x: 0, y: 0 }),
            };

            x = this.centerPoint.x + Math.cos(rot) * outerRadius;
            y = this.centerPoint.y + Math.sin(rot) * outerRadius;
            star_coord.spike.x = x;
            star_coord.spike.y = y;
            starPath.add(new Point(x, y));

            rot += step

            x = this.centerPoint.x + Math.cos(rot) * innerRadius;
            y = this.centerPoint.y + Math.sin(rot) * innerRadius;

            star_coord.edgeR.x = x;
            star_coord.edgeR.y = y;
            star_coord.edgeL = prevEdge;
            starPath.add(new Point(x, y));
            rot += step

            starCoords.push(star_coord);
            prevEdge = new Point(x, y)
        }

        starPath.closePath();
        starPath.strokeWidth = 3;
        starPath.strokeColor = new Color('black');

        return starCoords;
    }
    private drawCircle(radius: number) {
        var path = new Path.Circle(this.centerPoint, radius);
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