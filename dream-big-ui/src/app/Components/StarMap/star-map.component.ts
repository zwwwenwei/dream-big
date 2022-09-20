import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Color, Path, Point, Project, PointText } from 'paper/dist/paper-core';
import { Star, CircleData, Planet } from './types';

@Component({
    selector: 'app-star-map',
    templateUrl: './star-map.component.html',
    styleUrls: ['./star-map.component.scss']

})
export class StarMapComponent implements AfterViewInit {
    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;

    context: any;
    public project: any; // paper.js root project
    public starList: Array<Star> = [];

    startPoint: paper.Point = {} as paper.Point;

    starColour: string = "#EAEEF0"

    followStar: Star = {} as Star;
    followPoint: paper.Point = {} as paper.Point;
    isFollowing: boolean = false;
    hasClicked: boolean = false;
    factor = 1.25;
    private _minZoom!: number;
    private _maxZoom!: number;
    private zoomOffset!: paper.Point;
    private orbitTracker = 1;
    private animationId = -1;
    private newFollowStar: boolean = false;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        this.project = new Project(this.canvas.nativeElement);
        this.context = this.canvas.nativeElement.getContext('2d');
        this.renderer.listen(this.canvas.nativeElement, 'wheel', (event) => {
            this.onMouseScroll(event);
        });
        setTimeout(() => {
            this.createStars();
            this.drawScene();
        }, 0);
    }

    public onMouseScroll(e: any) {
        e.preventDefault();
        const mousePoint = new Point(e.offsetX, e.offsetY);

        setTimeout(() => {
            this.changeZoomCentered(e.deltaY, mousePoint);
            // this.doZoom(mousePoint, zoomAmount)
            this.drawScene();
        }, 0);

    }
    public onMouseMove(e: any) {
        var mousePoint = new Point(e.offsetX, e.offsetY);
        // mousePoint = mousePoint.add(this.zoomOffset);

        if (this.isFollowing) {
            this.followStar.circle.center = mousePoint;
        } else {
            let collidingStar = this.getStarCollision(mousePoint)
            if (!!Object.entries(collidingStar).length) {
                this.setCursor('pointer');
            } else {
                this.setCursor('default');
            }
        }

        this.drawScene();
    }

    public onMouseClick(e: any) {
        var mousePoint = new Point(e.offsetX, e.offsetY);
        // console.log('before', mousePoint);
        // mousePoint = mousePoint.add(this.zoomOffset);
        // console.log('zoomoffset', this.zoomOffset);
        // console.log('after', mousePoint);

        for (var i = 0; i < this.starList.length; i++) {
            this.starList[i].circle.strokeColour = "black";
            this.starList[i].circle.strokeWidth = 3;
            if (this.starList[i].circlePath.contains(mousePoint)) {
                // console.log(this.starList[i])
                this.starList[i].circle.strokeColour = "red";
                this.starList[i].circle.strokeWidth = 5;
                // this.followStar = collidingStar;
            }
        }
        this.drawScene();
    }

    public onMouseDown(e: any) {
        console.log('mousedown');
        var mousePoint = new Point(e.offsetX, e.offsetY);

        let collidingStar = {} as Star;
        var foundCollision = false;
        this.hasClicked = false;

        for (var i = 0; i < this.starList.length; i++) {
            this.starList[i].circle.strokeColour = "black";
            this.starList[i].circle.strokeWidth = 3;
            if (this.starList[i].circlePath.contains(mousePoint) && !foundCollision) {
                collidingStar = this.starList[i];
                foundCollision = true;
                this.hasClicked = true;
            }
        }
        if (foundCollision && !this.isFollowing) {
            collidingStar.circle.strokeColour = "red";
            collidingStar.circle.strokeWidth = 5;
            this.newFollowStar = !Object.entries(this.followStar).length || this.followStar != collidingStar;
            // console.log(this.followStar);
            // console.log(this.newFollowStar);

            this.followStar = collidingStar;
            this.followPoint = mousePoint;
            this.isFollowing = true;

            this.setCursor('grab');
        }
        this.drawScene(this.newFollowStar);

    }
    public onMouseUp(e: any) {
        this.isFollowing = false;
        // this.followPoint = {} as paper.Point;
        // this.followStar = {} as Star;

        this.setCursor('pointer');

        this.drawScene();
    }

    get zoom(): number {
        return this.project.view.zoom;
    }

    get zoomRange(): number[] {
        return [this._minZoom, this._maxZoom];
    }

    /**
     * Set zoom level.
     * @returns zoom level that was set, or null if it was not changed
     */
    setZoomConstrained(zoom: number): number {
        if (this._minZoom) {
            zoom = Math.max(zoom, this._minZoom);
        }
        if (this._maxZoom) {
            zoom = Math.min(zoom, this._maxZoom);
        }
        const view = this.project.view;
        if (zoom != view.zoom) {
            view.zoom = zoom;
            return zoom;
        }
        return 1;
    }

    setZoomRange(range: paper.Size[]): number[] {
        const view = this.project.view;
        const aSize = range.shift();
        const bSize = range.shift();
        const a = aSize && Math.min(
            view.bounds.height / aSize.height,
            view.bounds.width / aSize.width);
        const b = bSize && Math.min(
            view.bounds.height / bSize.height,
            view.bounds.width / bSize.width);
        const min = Math.min(a!, b!);
        if (min) {
            this._minZoom = min;
        }
        const max = Math.max(a!, b!);
        if (max) {
            this._maxZoom = max;
        }
        return [this._minZoom, this._maxZoom];
    }

    changeZoomCentered(delta: number, mousePos: paper.Point) {
        if (!delta) {
            return;
        }
        const view = this.project.view;
        const oldZoom = view.zoom;
        const oldCenter = view.center;
        const viewPos = view.viewToProject(mousePos);

        let newZoom = delta > 0
            ? view.zoom * this.factor
            : view.zoom / this.factor;
        newZoom = this.setZoomConstrained(newZoom);

        if (!newZoom) {
            return;
        }

        const zoomScale = oldZoom / newZoom;
        const centerAdjust = viewPos.subtract(oldCenter);
        const offset = viewPos.subtract(centerAdjust.multiply(zoomScale))
            .subtract(oldCenter);

        view.center = view.center.add(offset);
        this.zoomOffset = centerAdjust.multiply(zoomScale);
    };




    private setCursor(type: string) {
        window.document.getElementById("aa")?.setAttribute("style", "cursor:" + type);

    }


    private getStarCollision(xy: paper.Point) {
        var collision = {} as Star;
        for (var i = 0; i < this.starList.length; i++) {

            if (!!Object.entries(this.starList[i].circlePath).length && this.starList[i].circlePath.contains(xy)) {
                collision = this.starList[i];
            }
        }
        return collision;
    }

    private getRandomCircle(point: paper.Point, minSize: number, maxSize: number): CircleData {
        var fillColour = this.getRandomColourCode();
        var size = this.getRandomNumberBetween(minSize, maxSize)
        return this.getCircle(
            point,
            size,
            fillColour,
        )
    }

    private updatePlanets() {
        for (var i = 0; i < this.followStar.planets.length; i++) {
            this.followStar.planets[i].circle.center = new Point(
                this.followStar.circle.center.x - this.followStar.planets[i].offset.x,
                this.followStar.circle.center.y - this.followStar.planets[i].offset.y,
            )
        }
    }

    private planetsFollowStar() {
        var orbitSpeed = this.orbitTracker++;

        for (var i = 0; i < this.followStar.planets.length; i++) {
            // this.followStar.circle.center(this.followStar.planets[i].offset);

            var angle = this.getAngle(this.followStar.circle.center, this.followStar.planets[i].circle.center);
            angle = angle + orbitSpeed % 360;
            angle = (Math.PI * angle) / 180;
            // console.log(angle);

            // this.followStar.planets[i].circlePath.tweenTo(newCenter, 1)
            this.followStar.planets[i].circle.center = this.getCirclePoint(this.followStar.circle.center, this.getDistance(this.followStar.circle.center, this.followStar.planets[i].circle.center), angle);
            // this.followStar.planets[i].circlePath = this.drawCirclePath(this.followStar.planets[i].circle);

        }
    }

    private getCirclePoint(center: paper.Point, radius: number, angle: number) {
        // Where r is the radius, cx,cy the origin, and a the angle.
        return new Point(
            center.x + (radius * Math.cos(angle)),
            center.y + (radius * Math.sin(angle)),
        )
    }

    private getDistance(point1: paper.Point, point2: paper.Point) {
        return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
    }
    private getAngle(point1: paper.Point, point2: paper.Point) {
        var dy = point2.y - point1.y;
        var dx = point2.x - point1.x;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        return theta;
    }

    private getAngleDeg(point1: paper.Point, point2: paper.Point) {
        var theta = this.getAngle(point1, point2); // range (-180, 180]
        if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    }



    public createStars(num_stars = 3) {
        var prevPoint = {
            x: 10,
            y: 200
        } as paper.Point;

        for (var i = 0; i < num_stars; i++) {
            var point = {
                x: prevPoint.x + this.getRandomNumberBetween(50, 100),
                y: Math.max(prevPoint.y + this.getRandomNumberBetween(-50, 50), 50)
            } as paper.Point;

            var starCircle = this.getRandomCircle(point, 15, 20);
            var planets = [];
            for (var j = 0; j < this.getRandomNumberBetween(5, 10); j++) {
                const posX = this.getRandomNumberBetween(0, 10) > 5;
                const posY = this.getRandomNumberBetween(0, 10) > 5;

                var orbitDist = this.getRandomNumberBetween(50, 150);
                var angle = this.getRandomNumberBetween(0, 360);
                var planetPoint = this.getCirclePoint(starCircle.center, orbitDist, angle);
                var planetCircle = this.getRandomCircle(planetPoint, 2, 5);


                const planet: Planet = {
                    id: i + j,
                    size: planetCircle.radius,
                    circle: planetCircle,
                    offset: {
                        x: starCircle.center.x - planetCircle.center.x,
                        y: starCircle.center.y - planetCircle.center.y,
                    } as paper.Point,
                    circlePath: {} as paper.Path
                }
                planets.push(planet);
            }
            const star: Star = {
                id: i,
                size: starCircle.radius,
                circle: starCircle,
                circlePath: {} as paper.Path,
                planets
            }
            this.starList.push(star);
            prevPoint = point;
        }
    }
    private getCircle(center: paper.Point, radius: number, fillColour = 'yellow', strokeColour = 'black'): CircleData {
        return {
            center,
            radius,
            fillColour,
            strokeColour,
            strokeWidth: 3
        };
    }
    private drawCirclePath(circle: CircleData) {
        var path = new Path.Circle({ center: circle.center, radius: circle.radius });
        path.strokeColor = new Color(circle.strokeColour);
        path.fillColor = new Color(circle.fillColour);
        path.strokeWidth = circle.strokeWidth;
        return path;
    }
    // public addStar() {
    //     var point = {
    //         x: this.starList[this.starList.length - 1].circle.center.x + this.getRandomNumberBetween(50, 100),
    //         y: Math.max(this.starList[this.starList.length - 1].circle.center.y + this.getRandomNumberBetween(-50, 50), 50)
    //     } as paper.Point;
    //     var fillColour = this.getRandomColourCode();
    //     var size = this.getRandomNumberBetween(10, 20);
    //     var circle = this.getCircle(
    //         point,
    //         size,
    //         fillColour
    //     );
    //     const star: Star = {
    //         id: this.starList.length,
    //         size: this.getRandomNumberBetween(10, 20),
    //         circle,
    //         circlePath: {} as paper.Path
    //     }
    //     this.starList.push(star);

    //     this.drawScene();

    // }

    public removeStar() {
        this.starList.pop();
        this.drawScene();
    }

    private drawOutline() {
        var path = new Path;
        path.add({ x: 0, y: 0 } as paper.Point);
        path.add({ x: this.canvas.nativeElement.clientWidth, y: 0 } as paper.Point);
        path.add({ x: this.canvas.nativeElement.clientWidth, y: this.canvas.nativeElement.clientHeight } as paper.Point);
        path.add({ x: 0, y: this.canvas.nativeElement.clientHeight } as paper.Point);
        path.closePath();
        path.strokeColor = new Color('black');
        path.strokeWidth = 3;
    }
    public drawStars() {
        if (!!this.starList.length) {
            var prevStar = this.starList[0];

            for (var i = 1; i < this.starList.length; i++) {
                const star = this.starList[i];
                this.drawLineBetween(prevStar.circle.center, star.circle.center);
                prevStar = star;
            }

            for (var i = 0; i < this.starList.length; i++) {
                const star = this.starList[i];
                star.circlePath = this.drawCirclePath(star.circle);
            }
            for (var i = 0; i < this.starList.length; i++) {
                const star = this.starList[i];
                if (star == this.followStar) {
                    star.circlePath.bringToFront();

                }
            }
        }
    }

    private drawPlanets() {
        var planets = this.followStar.planets
        for (var i = 0; i < planets.length; i++) {
            const p = planets[i];
            p.circlePath = this.drawCirclePath(p.circle);
        }
    }
    public drawScene(animate = false) {
        setTimeout(() => {
            // clear the canvas so the star can be redrawn
            this.project.clear();
            this.drawOutline();
            this.drawStars();
            // this.planetsFollowStar();
            if (animate) {
                if (this.newFollowStar) {
                    window.cancelAnimationFrame(this.animationId);
                    this.animationId = -1;
                }
                if (this.hasClicked) {


                    this.drawPlanets();

                    this.animationId = window.requestAnimationFrame(() => {
                        // console.log(this.orbitTracker);
                        this.updatePlanets();
                        this.planetsFollowStar();
                        this.drawScene(true);
                    });

                } else {
                    window.cancelAnimationFrame(this.animationId);
                    this.animationId = -1;
                    console.log('cancelled');
                }
            }

        });
    }


    private drawLineBetween(point_1: paper.Point, point_2: paper.Point, colour = 'black') {
        var path = new Path.Line(point_1, point_2);
        path.strokeColor = new Color(colour);
    }

    private getRandomColourCode() {
        var makeColorCode = '0123456789ABCDEF';
        var code = '#';
        for (var count = 0; count < 6; count++) {
            code = code + makeColorCode[Math.floor(Math.random() * 16)];
        }
        return code;
    }

    private getRandomNumberBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}