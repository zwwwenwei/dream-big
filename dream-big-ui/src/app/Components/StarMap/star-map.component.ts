import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Color, Path, Point, Project, PointText, Raster, Group } from 'paper/dist/paper-core';
import { Star, CircleData, Planet, StarSystem } from './types';

@Component({
    selector: 'app-star-map',
    templateUrl: './star-map.component.html',
    styleUrls: ['./star-map.component.scss']

})
export class StarMapComponent implements AfterViewInit {
    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
    @ViewChild('planet') planet: ElementRef<HTMLImageElement> = {} as ElementRef<HTMLImageElement>;


    public project: any; // paper.js root project
    starSystemList: StarSystem[] = [];
    public isViewingSystem: boolean = false;
    public hasClicked: boolean = false;
    public hasClickedPlanet: boolean = false;
    public followSystem: boolean = false;
    public viewSystem: StarSystem = {} as StarSystem;
    public viewPlanet: Planet = {} as Planet;
    private collidingPlanet: Planet = {} as Planet;

    public isSolarView: boolean = false;
    private collideSystem: StarSystem = {} as StarSystem;
    private circleStrokeColour = 'white';
    private circleStrokeWidth = 2;
    private _selectStrokeWidth = 2;
    private _selectStrokeColour = 'red';
    private _highlightStrokeWidth = 2;
    private _highlightStrokeColour = 'yellow';
    private textColour: string = 'white';
    private textFont: string = 'Arial'
    private textSize: number = 15;
    private viewSystemZoom: number = 3;
    private addOrbitAngle: number = 60;

    constructor(private renderer: Renderer2) {

    }

    ngAfterViewInit(): void {

        this.project = new Project(this.canvas.nativeElement);

        setTimeout(() => {
            // get star systems from api
            // or use this test method
            this.createStarSystems();

            this.drawScene();
        }, 0);
    }

    public onMouseMove(e: any) {
        let mousePoint = new Point(e.offsetX, e.offsetY);

        if (!this.isSolarView) {
            let collidingSystem = this.getStarCollision(mousePoint);

            if (!!Object.entries(collidingSystem).length) {
                if (collidingSystem !== this.viewSystem) {
                    this.highlightCircle(collidingSystem.star.circle);
                    this.collideSystem = collidingSystem;
                }
                this.setCursor('pointer');

            } else {
                this.setCursor('default');
                if (!!Object.entries(this.collideSystem).length && this.collideSystem != this.viewSystem) {
                    this.resetCircleStroke(this.collideSystem.star.circle)
                    this.collideSystem = {} as StarSystem;
                }
            }

        } else {
            let collidingPlanet = this.getPlanetCollision(mousePoint);

            if (!!Object.entries(collidingPlanet).length) {
                if (collidingPlanet !== this.viewPlanet) {
                    this.highlightCircle(collidingPlanet.circle)
                    this.collidingPlanet = collidingPlanet;
                }
                this.setCursor('pointer');

            } else {
                this.setCursor('default');
                if (!!Object.entries(this.collidingPlanet).length && this.collidingPlanet != this.viewPlanet) {
                    this.resetCircleStroke(this.collidingPlanet.circle)
                    this.collidingPlanet = {} as Planet;
                }
            }
        }
        this.drawScene();

    }

    public onMouseClick(e: any) {
        let mousePoint = new Point(e.offsetX, e.offsetY);
        if (this.isSolarView) {
            const clickedPlanet = this.getPlanetCollision(mousePoint);
            if (!!Object.entries(clickedPlanet).length) {
                if (!!Object.entries(this.viewPlanet).length) {
                    this.resetCircleStroke(this.viewPlanet.circle);
                }
                this.selectCircle(clickedPlanet.circle)
                this.viewPlanet = clickedPlanet;
                this.hasClickedPlanet = true;
            } else {
                this.resetCircleStroke(this.viewPlanet.circle);
                this.hasClickedPlanet = false;
                this.viewPlanet = {} as Planet;
            }

        } else {
            const clickedSystem = this.getStarCollision(mousePoint);
            if (!!Object.entries(clickedSystem).length) {
                if (!!Object.entries(this.viewSystem).length) {
                    this.resetCircleStroke(this.viewSystem.star.circle);
                }

                this.selectCircle(clickedSystem.star.circle);
                this.viewSystem = clickedSystem;
                this.hasClicked = true;
            } else {
                this.hasClicked = false;
                this.resetCircleStroke(this.viewSystem.star.circle);

                this.viewSystem = {} as StarSystem;
            }
        }


        this.drawScene();
    }

    private highlightCircle(circle: CircleData) {
        circle.strokeColour = this._highlightStrokeColour;
        circle.strokeWidth = this._highlightStrokeWidth;
    }
    private selectCircle(circle: CircleData) {
        circle.strokeColour = this._selectStrokeColour;
        circle.strokeWidth = this._selectStrokeWidth;
    }
    private resetCircleStroke(circle: CircleData) {
        circle.strokeColour = this.circleStrokeColour;
        circle.strokeWidth = this.circleStrokeWidth;
    }
    private setCursor(type: string) {
        window.document.getElementById("star-map-div")?.setAttribute("style", "cursor:" + type);
    }


    private getStarCollision(xy: paper.Point) {
        let collision = {} as StarSystem;
        for (let i = 0; i < this.starSystemList.length; i++) {

            if (!!Object.entries(this.starSystemList[i].star.circlePath).length && this.starSystemList[i].star.circlePath.contains(xy)) {
                collision = this.starSystemList[i];
            }
        }
        return collision;
    }
    private getPlanetCollision(xy: paper.Point) {
        let collision = {} as Planet;
        for (let i = 0; i < this.viewSystem.planets.length; i++) {

            if (!!Object.entries(this.viewSystem.planets[i].circlePath).length && this.viewSystem.planets[i].circlePath.contains(xy)) {
                collision = this.viewSystem.planets[i];
            }
        }
        return collision;
    }

    private getRandomCircle(point: paper.Point, minSize: number, maxSize: number): CircleData {
        let fillColour = this.getRandomColourCode();
        let size = this.randInt(minSize, maxSize)
        return this.getCircle(
            point,
            size,
            fillColour,
        )
    }



    private getCirclePoint(center: paper.Point, radius: number, angle: number) {
        // Where r is the radius, cx,cy the origin, and a the angle.
        return new Point(
            center.x + (radius * Math.cos(angle)),
            center.y + (radius * Math.sin(angle)),
        )
    }



    public createStarSystems() {
        let prevPoint = {
            x: 10,
            y: 200
        } as paper.Point;

        const num_systems = this.randInt(5, 10)
        for (let i = 0; i < num_systems; i++) {
            let point = {
                x: prevPoint.x + this.randInt(50, 100),
                y: Math.max(prevPoint.y + this.randInt(-50, 50), 50)
            } as paper.Point;

            let starCircle = this.getRandomCircle(point, 15, 30);

            const star: Star = {
                id: i,
                name: `Trimester ${(i % 3) + 1}`,
                size: starCircle.radius,
                circle: starCircle,
                circlePath: {} as paper.Path,
            }


            let planets = [];
            let angleCtr = 0;
            let addOrbitDist = 20;
            let maxOrbitDist = 200;
            let orbitCtr = 0;
            for (let j = 0; j < this.randInt(5, 10); j++) {

                let orbitDist = (star.size * this.viewSystemZoom) + ((++orbitCtr * addOrbitDist) % maxOrbitDist)
                let angle = angleCtr;
                angleCtr += this.addOrbitAngle;
                let planetPoint = this.getCirclePoint(this.getCanvasMidPoint(), orbitDist, angle);
                let orbitCircle = this.getCircle(this.getCanvasMidPoint(), orbitDist, '', 'lightgray', 0.2);
                let planetCircle = this.getRandomCircle(planetPoint, 10, 15);

                const planet: Planet = {
                    id: i + j,
                    size: planetCircle.radius,
                    circle: planetCircle,
                    orbitCircle: orbitCircle,
                    offset: {
                        x: starCircle.center.x - planetCircle.center.x,
                        y: starCircle.center.y - planetCircle.center.y,
                    } as paper.Point,
                    name: 'Planet ' + (i + j),
                    circlePath: {} as paper.Path,
                }
                planets.push(planet);
            }


            const name = 'Lorem Ipsum Det Tolar';
            const status = this.randInt(0, 1) ? 'Completed' : 'Incomplete';
            const starSystem: StarSystem = {
                id: i,
                star,
                planets,
                name,
                status,

            }
            this.starSystemList.push(starSystem);
            prevPoint = point;
        }
    }
    private getCircle(center: paper.Point, radius: number, fillColour = 'yellow', strokeColour = this.circleStrokeColour, strokeWidth = this.circleStrokeWidth): CircleData {
        return {
            center,
            radius,
            fillColour,
            strokeColour,
            strokeWidth
        };
    }
    private drawCirclePath(circle: CircleData) {
        let path = new Path.Circle({ center: circle.center, radius: circle.radius });
        if (circle.strokeColour) {
            path.strokeColor = new Color(circle.strokeColour);
        }
        if (circle.fillColour) {
            path.fillColor = new Color(circle.fillColour);

        }
        if (circle.strokeWidth) {
            path.strokeWidth = circle.strokeWidth;
        }
        return path;
    }


    public removeSystem() {
        this.starSystemList.pop();
        this.drawScene();
    }

    private drawOutline() {
        let path = new Path;
        path.add({ x: 0, y: 0 } as paper.Point);
        path.add({ x: this.canvas.nativeElement.clientWidth, y: 0 } as paper.Point);
        path.add({ x: this.canvas.nativeElement.clientWidth, y: this.canvas.nativeElement.clientHeight } as paper.Point);
        path.add({ x: 0, y: this.canvas.nativeElement.clientHeight } as paper.Point);
        path.closePath();
        path.fillColor = new Color('black');
    }

    private drawStarName(xy: paper.Point, content: string, x_offset: number, y_offset: number) {
        const point = {
            x: xy.x + x_offset,
            y: xy.y + y_offset
        }

        const pt = new PointText({
            point,
            content,
            fillColor: this.textColour,
            fontFamily: this.textFont,
            fontSize: this.textSize,
        });
    }

    public drawStarSystem() {
        if (!Object.entries(this.viewSystem).length) {
            console.log('something bad when drawing star system')
            return;
        }
        if (!this.isViewingSystem) {
            this.viewSystem.star.circle = this.getCircle(this.getCanvasMidPoint(), this.viewSystem.star.circle.radius * this.viewSystemZoom, this.viewSystem.star.circle.fillColour, this.viewSystem.star.circle.strokeColour, this.viewSystem.star.circle.strokeWidth)
            this.isViewingSystem = true;
        }
        this.viewSystem.star.circlePath = this.drawCirclePath(this.viewSystem.star.circle);

        this.viewSystem.planets.forEach((planet) => {
            // if (this.randInt(0, 10) > 6) {
            this.drawCirclePath(planet.orbitCircle);
            // }
        });
        this.viewSystem.planets.forEach((planet) => {
            planet.circle = this.getCircle(planet.circle.center, planet.circle.radius, planet.circle.fillColour, planet.circle.strokeColour, planet.circle.strokeWidth);
            planet.circlePath = this.drawCirclePath(planet.circle);
        });


    }

    public drawStars() {
        if (!!this.starSystemList.length) {
            let prevStar = this.starSystemList[0].star;

            for (let i = 1; i < this.starSystemList.length; i++) {
                const star = this.starSystemList[i].star;
                this.drawLineBetween(prevStar.circle.center, star.circle.center);
                prevStar = star;
            }
            for (let i = 0; i < this.starSystemList.length; i++) {
                const star = this.starSystemList[i].star;
                star.circlePath = this.drawCirclePath(star.circle);
            }
            for (let i = 0; i < this.starSystemList.length; i++) {
                const star = this.starSystemList[i].star;
                this.drawStarName(star.circle.center, star.name, -10, -30);
            }
        }
    }

    private drawPlanets() {
        let planets = this.viewSystem.planets;
        for (let i = 0; i < planets.length; i++) {
            const p = planets[i];
            p.circlePath = this.drawCirclePath(p.circle);
        }
    }

    public drawScene() {
        setTimeout(() => {
            // clear the canvas so the star can be redrawn
            this.project.clear();
            // this.drawOutline();
            if (this.isSolarView) {
                this.drawStarSystem();
            } else {
                this.drawStars();
            }
        });
    }

    private getCanvasMidPoint(): paper.Point {
        return new Point(
            this.canvas.nativeElement.clientWidth / 2,
            this.canvas.nativeElement.clientHeight / 2
        );
    }

    private drawLineBetween(point_1: paper.Point, point_2: paper.Point, colour = 'white') {
        let path = new Path.Line(point_1, point_2);
        path.strokeColor = new Color(colour);
    }

    private getRandomColourCode() {
        let makeColorCode = '0123456789ABCDEF';
        let code = '#';
        for (let count = 0; count < 6; count++) {
            code = code + makeColorCode[Math.floor(Math.random() * 16)];
        }
        return code;
    }

    private randInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    private reorder(data: Array<any>, index: number) {
        return data.slice(index).concat(data.slice(0, index))
    };
}