import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Color, Path, Point, Project, PointText, Raster, Group } from 'paper/dist/paper-core';
import { Star, CircleData, Planet } from './types';

@Component({
    selector: 'app-star-map',
    templateUrl: './star-map.component.html',
    styleUrls: ['./star-map.component.scss']

})
export class StarMapComponent implements AfterViewInit {
    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
    @ViewChild('planet') planet: ElementRef<HTMLImageElement> = {} as ElementRef<HTMLImageElement>;


    public project: any; // paper.js root project
    public starList: Array<Star> = [];

    followStar: Star = {} as Star;

    isFollowing: boolean = false;
    hasClicked: boolean = false;
    factor = 1.25;
    private _minZoom!: number;
    private _maxZoom!: number;
    private orbitTracker = 1;
    private animationId = -1;
    private newFollowStar: boolean = false;


    private isSolarView: boolean = false;
    private _starStrokeColour = 'black';
    private _starStrokeWidth = 0;
    private _selectStarStrokeWidth = 0;
    private _selectStarStrokeColour = 'red';
    private _zoomedStarSize = 100;

    constructor(private renderer: Renderer2) {

    }

    ngAfterViewInit(): void {

        this.project = new Project(this.canvas.nativeElement);
        this.renderer.listen(this.canvas.nativeElement, 'wheel', (event) => {
            this.onMouseScroll(event);
        });

        setTimeout(() => {
            this.createStars();
            this.drawScene();
        }, 0);
    }

    private getImagePaths(num_images: number) {
        const images = [];
        for (let i = 1; i > num_images; i++) {
            images.push(i);
        }
        return images;
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
            this.starList[i].circle.strokeColour = this._starStrokeColour;
            this.starList[i].circle.strokeWidth = this._starStrokeWidth;
            if (this.starList[i].circlePath.contains(mousePoint)) {
                this.isSolarView = true;
                // console.log(this.starList[i])
                this.starList[i].circle.strokeColour = this._selectStarStrokeColour;
                this.starList[i].circle.strokeWidth = this._selectStarStrokeWidth;
                // this.followStar = collidingStar;
            }
        }
        this.drawScene();
    }

    public onMouseDown(e: any) {
        // console.log('mousedown');
        var mousePoint = new Point(e.offsetX, e.offsetY);

        let collidingStar = {} as Star;
        var foundCollision = false;
        this.hasClicked = false;

        for (var i = 0; i < this.starList.length; i++) {
            this.starList[i].circle.strokeColour = this._starStrokeColour;
            this.starList[i].circle.strokeWidth = this._starStrokeWidth;
            if (this.starList[i].circlePath.contains(mousePoint) && !foundCollision) {
                collidingStar = this.starList[i];
                foundCollision = true;
                this.hasClicked = true;
            }
        }
        if (foundCollision && !this.isFollowing) {
            collidingStar.circle.strokeColour = this._selectStarStrokeColour;
            collidingStar.circle.strokeWidth = this._selectStarStrokeWidth;
            this.newFollowStar = !Object.entries(this.followStar).length || this.followStar != collidingStar;
            // console.log(this.followStar);
            // console.log(this.newFollowStar);

            this.followStar = collidingStar;

            this.isFollowing = true;

            this.setCursor('grab');
        }
        this.drawScene(this.newFollowStar);

    }
    public onMouseUp(e: any) {
        this.isFollowing = false;
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
            var angle = this.getAngle(this.followStar.circle.center, this.followStar.planets[i].circle.center);
            angle = angle + orbitSpeed / this.followStar.planets[i].size % 360;
            angle = (Math.PI * angle) / 180;

            this.followStar.planets[i].circle.center = this.getCirclePoint(
                this.followStar.circle.center,
                this.getDistance(this.followStar.circle.center, this.followStar.planets[i].circle.center),
                angle
            );
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
        if (this.starList.length) {
            prevPoint = this.starList[this.starList.length - 1].circle.center;
        }

        for (var i = 0; i < num_stars; i++) {
            var point = {
                x: prevPoint.x + this.getRandomNumberBetween(50, 100),
                y: Math.max(prevPoint.y + this.getRandomNumberBetween(-50, 50), 50)
            } as paper.Point;

            var starCircle = this.getRandomCircle(point, 15, 30);
            var planets = [];
            for (var j = 0; j < this.getRandomNumberBetween(5, 10); j++) {
                const posX = this.getRandomNumberBetween(0, 10) > 5;
                const posY = this.getRandomNumberBetween(0, 10) > 5;

                var orbitDist = this.getRandomNumberBetween(50, 150);
                var angle = this.getRandomNumberBetween(0, 360);
                var planetPoint = this.getCirclePoint(starCircle.center, orbitDist, angle);
                var planetCircle = this.getRandomCircle(planetPoint, 4, 8);
                var planetImage = this.getRandomNumberBetween(1, 8);

                const planet: Planet = {
                    id: i + j,
                    size: planetCircle.radius,
                    circle: planetCircle,
                    offset: {
                        x: starCircle.center.x - planetCircle.center.x,
                        y: starCircle.center.y - planetCircle.center.y,
                    } as paper.Point,
                    circlePath: {} as paper.Path,
                    imageId: planetImage,
                    imageRaster: {} as paper.Raster
                }
                planets.push(planet);
            }
            var starImage = this.getRandomNumberBetween(1, 8);

            const star: Star = {
                id: i,
                size: starCircle.radius,
                circle: starCircle,
                circlePath: {} as paper.Path,
                planets,
                imageId: starImage,
                imageRaster: {} as paper.Raster
            }
            this.starList.push(star);
            prevPoint = point;
        }
    }
    private getCircle(center: paper.Point, radius: number, fillColour = 'yellow', strokeColour = 'black', strokeWidth = 0): CircleData {
        return {
            center,
            radius,
            fillColour,
            strokeColour,
            strokeWidth
        };
    }
    private drawCirclePath(circle: CircleData) {
        var path = new Path.Circle({ center: circle.center, radius: circle.radius });
        path.strokeColor = new Color(circle.strokeColour);
        path.fillColor = new Color(circle.fillColour);
        path.strokeWidth = circle.strokeWidth;
        return path;
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
        path.fillColor = new Color('black');
    }


    private pasteImage(image_id: string, point: paper.Point, width: number) {
        var raster = new Raster(image_id);
        raster.scale(width / raster.width);
        raster.position = point;
        return raster;
    }

    private zoomOnStar(star: Star) {
        star.size = this._zoomedStarSize;
        star.circle = this.getCircle(this.getCanvasMidPoint(), star.size, star.circle.fillColour, star.circle.strokeColour, star.circle.strokeWidth);
        this.pasteImage(`star${star.imageId}`, star.circle.center, star.circle.radius * 2);
        this.planetsFollowStar();
    }

    public drawFollowStar(star:Star) {
        star.circlePath = this.drawCirclePath(star.circle);

        star.imageRaster = this.pasteImage(`star${star.imageId}`, star.circle.center, star.circle.radius * 2);
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
                star.imageRaster = this.pasteImage(`star${star.imageId}`, star.circle.center, star.circle.radius * 2);

            }
            if (this.isFollowing) {
                this.followStar.circlePath.bringToFront()
                this.followStar.imageRaster.bringToFront();
            }
        }
    }

    private drawPlanets() {
        var planets = this.followStar.planets
        for (var i = 0; i < planets.length; i++) {
            const p = planets[i];
            p.circlePath = this.drawCirclePath(p.circle);
            this.pasteImage(`planet${p.imageId}`, p.circle.center, p.circle.radius * 2)
        }
    }
    public drawScene(animate = false) {
        setTimeout(() => {
            // clear the canvas so the star can be redrawn
            this.project.clear();
            this.drawOutline();
            this.drawStars();

            if (animate) {
                if (this.newFollowStar) {
                    window.cancelAnimationFrame(this.animationId);
                    this.animationId = -1;
                }
                if (this.hasClicked) {
                    this.animationId = window.requestAnimationFrame(() => {
                        this.updatePlanets();
                        this.planetsFollowStar();
                        this.drawScene(true);
                    });
                    this.drawPlanets();

                } else {
                    window.cancelAnimationFrame(this.animationId);
                    this.animationId = -1;
                }
            }
            this.project.view.draw();

        });
    }

    private getCanvasMidPoint(): paper.Point {
        return new Point(
            this.canvas.nativeElement.clientWidth/2,
            this.canvas.nativeElement.clientHeight/2
        );
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