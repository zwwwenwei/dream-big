import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Color, Path, Point, Project, PointText } from 'paper/dist/paper-core';
import { Star, StarCircle } from './types';

@Component({
    selector: 'app-star',
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

    factor = 1.25;
    private _minZoom!: number;
    private _maxZoom!: number;
    private zoomOffset!:paper.Point;


    constructor(private renderer: Renderer2) { }

    ngAfterViewInit(): void {
        this.project = new Project(this.canvas.nativeElement);
        this.context = this.canvas.nativeElement.getContext('2d');
        this.renderer.listen(this.canvas.nativeElement, 'wheel', (event) => {
            this.onMouseScroll(event);
        });
        // this.canvas.nativeElement.addEventListener('wheel', this.onMouseScroll, true);
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

    public onMouseMove(e: any) {
        var mousePoint = new Point(e.offsetX,e.offsetY);

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


    private setCursor(type: string) {
        window.document.getElementById("aa")?.setAttribute("style", "cursor:" + type);

    }
    public onMouseClick(e: any) {

        var mousePoint = new Point(e.offsetX, e.offsetY);
        
        console.log('before', mousePoint);
        mousePoint = mousePoint.add(this.zoomOffset);
        console.log('zoomoffset', this.zoomOffset);
        console.log('after', mousePoint);

        let collidingStar = {} as Star;
        for (var i = 0; i < this.starList.length; i++) {
            this.starList[i].circle.strokeColour = "black";
            this.starList[i].circle.strokeWidth = 3;
            if (this.starList[i].circlePath.contains(mousePoint)) {
                console.log(this.starList[i])
                collidingStar = this.starList[i];
            }
        }
        if (!!Object.entries(collidingStar).length) {
            collidingStar.circle.strokeColour = "red";
            collidingStar.circle.strokeWidth = 5;
        }

        this.drawScene();


    }



    public onMouseDown(e: any) {
        var mousePoint = new Point(e.offsetX, e.offsetY);

        let collidingStar = {} as Star;
        for (var i = 0; i < this.starList.length; i++) {
            this.starList[i].circle.strokeColour = "black";
            this.starList[i].circle.strokeWidth = 3;
            if (this.starList[i].circlePath.contains(mousePoint)) {
                collidingStar = this.starList[i];
            }
        }
        if (!!Object.entries(collidingStar).length) {
            collidingStar.circle.strokeColour = "red";
            collidingStar.circle.strokeWidth = 5;
            this.followStar = collidingStar;
            this.followPoint = mousePoint;
            this.isFollowing = true;
            this.setCursor('grab');
        }

        this.drawScene();

    }
    public onMouseUp(e: any) {
        this.isFollowing = false;
        this.setCursor('pointer');

        this.drawScene();
    }

    private getStarCollision(xy: paper.Point) {
        var collision = {} as Star;
        for (var i = 0; i < this.starList.length; i++) {
            if (this.starList[i].circlePath.contains(xy)) {
                collision = this.starList[i];
            }
        }
        return collision;
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
            var fillColour = this.getRandomColourCode();
            var size = this.getRandomNumberBetween(20, 30)
            var circle = this.getCircle(
                point,
                size,
                fillColour,
            )
            const star: Star = {
                id: i,
                size,
                circle,
                circlePath: {} as paper.Path
            }
            this.starList.push(star);
            prevPoint = point;
        }
    }
    private getCircle(center: paper.Point, radius: number, fillColour = 'yellow', strokeColour = 'black') {
        var path = {
            center,
            radius,
            fillColour,
            strokeColour,
            strokeWidth: 3
        };
        return path;
    }
    private drawCirclePath(circle: StarCircle) {
        var path = new Path.Circle({ center: circle.center, radius: circle.radius });
        path.strokeColor = new Color(circle.strokeColour);
        path.fillColor = new Color(circle.fillColour);
        path.strokeWidth = circle.strokeWidth;
        return path;
    }
    public addStar() {
        var point = {
            x: this.starList[this.starList.length - 1].circle.center.x + this.getRandomNumberBetween(50, 100),
            y: Math.max(this.starList[this.starList.length - 1].circle.center.y + this.getRandomNumberBetween(-50, 50), 50)
        } as paper.Point;
        var fillColour = this.getRandomColourCode();
        var size = this.getRandomNumberBetween(10, 20);
        var circle = this.getCircle(
            point,
            size,
            fillColour
        );
        const star: Star = {
            id: this.starList.length,
            size: this.getRandomNumberBetween(10, 20),
            circle,
            circlePath: {} as paper.Path
        }
        this.starList.push(star);

        this.drawScene();

    }

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
    public drawScene() {
        setTimeout(() => {
            // clear the canvas so the star can be redrawn
            this.project.clear();
            this.drawOutline();
            this.drawStars();
        }, 0);
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