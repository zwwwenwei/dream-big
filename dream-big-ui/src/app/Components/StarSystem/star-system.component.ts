import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Color, Path, Point, Project, PointText, Raster, Group } from 'paper/dist/paper-core';
import { Star, CircleData, Planet } from './types';

@Component({
    selector: 'app-star-system',
    templateUrl: './star-system.component.html',
    styleUrls: ['./star-system.component.scss']

})
export class StarSystemComponent implements AfterViewInit {
    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
    @ViewChild('planet') planet: ElementRef<HTMLImageElement> = {} as ElementRef<HTMLImageElement>;


    public project: any; // paper.js root project

    star: Star = {} as Star;

    hasClicked: boolean = false;

    private orbitTracker = 1;
    private animationId = -1;

    private _starStrokeColour = 'black';
    private _starStrokeWidth = 0;
    private _selectStarStrokeWidth = 0;
    private _selectStarStrokeColour = 'red';
    private orbitStart = false;
    constructor(private renderer: Renderer2) {

    }

    ngAfterViewInit(): void {

        this.project = new Project(this.canvas.nativeElement);
        this.renderer.listen(this.canvas.nativeElement, 'wheel', (event) => {
            this.onMouseScroll(event);
        });

        setTimeout(() => {
            this.createStar();
            this.drawScene(true);
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
        console.log('scrolled! (coulda done something here)')
        // e.preventDefault();
        // const mousePoint = new Point(e.offsetX, e.offsetY);

        // setTimeout(() => {
        //     this.changeZoomCentered(e.deltaY, mousePoint);
        //     // this.doZoom(mousePoint, zoomAmount)
        //     this.drawScene();
        // }, 0);
    }
    public onMouseMove(e: any) {
        var mousePoint = new Point(e.offsetX, e.offsetY);
        // mousePoint = mousePoint.add(this.zoomOffset);

        // get planet and star collision

        // if (this.isFollowing) {
        //     this.star.circle.center = mousePoint;
        // } else {
        //     let collidingStar = this.getStarCollision(mousePoint)
        //     if (!!Object.entries(collidingStar).length) {
        //         this.setCursor('pointer');
        //     } else {
        //         this.setCursor('default');
        //     }
        // }

        // this.drawScene();
    }

    public onMouseClick(e: any) {
        var mousePoint = new Point(e.offsetX, e.offsetY);

        // open planet or star menu

        // console.log('before', mousePoint);
        // mousePoint = mousePoint.add(this.zoomOffset);
        // console.log('zoomoffset', this.zoomOffset);
        // console.log('after', mousePoint);

        // for (var i = 0; i < this.starList.length; i++) {
        //     this.starList[i].circle.strokeColour = this._starStrokeColour;
        //     this.starList[i].circle.strokeWidth = this._starStrokeWidth;
        //     if (this.starList[i].circlePath.contains(mousePoint)) {
        //         this.isSolarView = true;
        //         // console.log(this.starList[i])
        //         this.starList[i].circle.strokeColour = this._selectStarStrokeColour;
        //         this.starList[i].circle.strokeWidth = this._selectStarStrokeWidth;
        //         // this.star = collidingStar;
        //     }
        // }
        // this.drawScene();
    }

    public onMouseDown(e: any) {
        // console.log('mousedown');
        var mousePoint = new Point(e.offsetX, e.offsetY);

        // drag a planet into the solar system

        // let collidingStar = {} as Star;
        // var foundCollision = false;
        // this.hasClicked = false;

        // for (var i = 0; i < this.starList.length; i++) {
        //     this.starList[i].circle.strokeColour = this._starStrokeColour;
        //     this.starList[i].circle.strokeWidth = this._starStrokeWidth;
        //     if (this.starList[i].circlePath.contains(mousePoint) && !foundCollision) {
        //         collidingStar = this.starList[i];
        //         foundCollision = true;
        //         this.hasClicked = true;
        //     }
        // }
        // if (foundCollision && !this.isFollowing) {
        //     collidingStar.circle.strokeColour = this._selectStarStrokeColour;
        //     collidingStar.circle.strokeWidth = this._selectStarStrokeWidth;
        //     this.newstar = !Object.entries(this.star).length || this.star != collidingStar;
        //     // console.log(this.star);
        //     // console.log(this.newstar);

        //     this.star = collidingStar;

        //     this.isFollowing = true;

        //     this.setCursor('grab');
        // }
        // this.drawScene(this.newstar);

    }
    public onMouseUp(e: any) {
        // this.isFollowing = false;
        // // this.star = {} as Star;

        // this.setCursor('pointer');

        // this.drawScene();
    }


    private setCursor(type: string) {
        window.document.getElementById("aa")?.setAttribute("style", "cursor:" + type);

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



    private planetsOrbitStar() {
        var orbitSpeed = this.orbitTracker++;

        for (var i = 0; i < this.star.planets.length; i++) {
            var angle = this.getAngle(this.star.circle.center, this.star.planets[i].circle.center);
            angle = angle + orbitSpeed / this.star.planets[i].size % 360;
            angle = (Math.PI * angle) / 180;

            this.star.planets[i].circle.center = this.getCirclePoint(
                this.star.circle.center,
                this.getDistance(this.star.circle.center, this.star.planets[i].circle.center),
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


    public createStar() {
        var point = this.getCanvasMidPoint();
        var starCircle = this.getRandomCircle(point, 15, 30);
        var planets = [];
        for (var j = 0; j < this.getRandomNumberBetween(5, 10); j++) {
            var orbitDist = this.getRandomNumberBetween(50, 150);
            var angle = this.getRandomNumberBetween(0, 360);
            var planetPoint = this.getCirclePoint(starCircle.center, orbitDist, angle);
            var planetCircle = this.getRandomCircle(planetPoint, 4, 8);
            var planetImage = this.getRandomNumberBetween(1, 8);

            const planet: Planet = {
                id: j,
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
            id: 1,
            size: starCircle.radius,
            circle: starCircle,
            circlePath: {} as paper.Path,
            planets,
            imageId: starImage,
            imageRaster: {} as paper.Raster
        }
        this.star = star;
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


    public drawStar() {
        this.star.circlePath = this.drawCirclePath(this.star.circle);
        this.star.imageRaster = this.pasteImage(`star${this.star.imageId}`, this.star.circle.center, this.star.circle.radius * 2);
    }

    private drawPlanets() {
        var planets = this.star.planets
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
            this.drawStar();
            if (!this.orbitStart || animate) {

                this.orbitStart;
                this.planetsOrbitStar();
                this.drawPlanets();
                
            }



        });
    }

    private getCanvasMidPoint(): paper.Point {
        return new Point(
            this.canvas.nativeElement.clientWidth / 2,
            this.canvas.nativeElement.clientHeight / 2
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