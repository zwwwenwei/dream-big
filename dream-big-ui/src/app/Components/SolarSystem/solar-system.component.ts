import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Color, Path, Point, Project, PointText, Layer } from 'paper/dist/paper-core';
import { drawBackground, drawBackgroundStars, drawCatPolygons, drawStar, drawStarPointCategories, getAngle, getBackgroundStars, getCatPolygons, getCirclePoint, getDistance, getStarData, randInt } from 'src/app/helpers/canvas';
import { BgStar, Polygon, StarData } from 'src/app/helpers/journey-star-types';
import { Category } from '../Star/types';
import { Star, CircleData, Planet, SolarSystem, CircleSprite } from './types';

@Component({
    selector: 'app-solar-system',
    templateUrl: './solar-system.component.html',
    styleUrls: ['./solar-system.component.scss']

})
export class SolarSystemComponent implements AfterViewInit {
    // @Input() loadedStarSystems!: any[];

    @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;

    public project: any; // paper.js root project

    public planetList: Planet[] = [];

    public isViewingPlanet: boolean = false;
    public hasClicked: boolean = false;
    public hasClickedPlanet: boolean = false;
    public viewSystem: SolarSystem = {} as SolarSystem;

    public viewPlanet: Planet = {} as Planet;
    private collidingPlanet: Planet = {} as Planet;
    public isSolarSystemView: boolean = true;
    private orbitTracker: any = {}
    private animationId: number = -1;

    private _circleStrokeColour = 'white';
    private _circleStrokeWidth = 2;
    private _selectStrokeWidth = 2;
    private _selectStrokeColour = 'red';

    private _highlightStrokeWidth = 2;
    private _highlightStrokeColour = 'yellow';
    private _hightlightOrbitWidth = 0.5;
    private _highlightOrbitColour = 'white';

    private _selectOrbitWidth = 1;
    private _selectOrbitColour = 'white';
    private _orbitStrokeWidth = 0.2;
    private _orbitStrokeColour = 'lightgray';

    private _textColour: string = 'white';
    private _textFont: string = 'Arial'
    private _textSize: number = 15;

    private _viewSystemZoom: number = 3;
    private _addOrbitAngle: number = 60;

    setCategories: Array<Category> = [
        {
            name: "Experience",
            score: randInt(0, 100),
            colour: "#74DB83",
        },
        {
            name: "Knowledge",
            score: randInt(0, 100),
            colour: "#62D6EA",
        },
        {
            name: "Employability",
            score: randInt(0, 100),
            colour: "#EA7662",
        },
        {
            name: "Readiness",
            score: randInt(0, 100),
            colour: "#DB74CD",
        },
        {
            name: "Networking",
            score: randInt(0, 100),
            colour: "#F3EA6D",
        },
    ]

    private catPolygons: Polygon[] = [];
    private starData: StarData = {} as StarData;

    private bgStars: BgStar[] = [];

    private frames: number;
    private startTime: number;


    private fgLayer: any;
    ngAfterViewInit(): void {
        this.project = new Project(this.canvas.nativeElement);

        setTimeout(() => {
            this.drawBackground();

            this.fgLayer = new Layer();
            this.createPlanetList();
            this.isSolarSystemView = true;
            this.startTime = Date.now();
            this.frames = 1;
            this.drawScene(true);
        }, 0);
    }

    /**
     * draw the background in a different layer
     * for performance purposes
     */
    public drawBackground() {
        const bgLayer = new Layer();
        const bgStars = getBackgroundStars(100, this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight);
        drawBackground(new Point(this.canvas.nativeElement.clientWidth, this.canvas.nativeElement.clientHeight), 'black');
        drawBackgroundStars(bgStars);

        this.starData = getStarData(
            this.setCategories,
            this.getCanvasMidPoint(),
            10
        );
        this.catPolygons = getCatPolygons(this.starData);
        drawStar(this.starData.starCoords);
        drawCatPolygons(this.catPolygons);
        drawStarPointCategories(this.starData.starCoords);
    }

    public drawScene(animate = false) {
        setTimeout(() => {
            this.fgLayer.clear();
            if (this.isSolarSystemView) {
                if (animate) {
                    this.animationId = window.requestAnimationFrame(() => {
                        this.frames++;
                        this.planetsOrbitStar();
                        this.drawScene(true);
                    });
                }
                this.drawPlanets(this.planetList);
                this.drawFPS();
                this.fgLayer.view.draw();
            } else {
                // view planet
            }
        });
    }

    public drawFPS() {
        const elapsedSeconds = Math.round((Date.now() - this.startTime)/1000);
        const totalFrames = Math.round(this.frames/elapsedSeconds);
        const frameStr = `FPS: ${totalFrames}`;
        this.drawText(new Point(20, 20), frameStr, 0, 0);
    }

    public onMouseMove(e: any) {
        let mousePoint = new Point(e.offsetX, e.offsetY);

        if (this.isSolarSystemView) {
            // in solar system view

            // check if the mouse has collided with a planet
            const collidingCircle = this.collideCircles(mousePoint, this.planetList);

            // check if the mouse has collided with an orbit circle
            const collidingOrbit = this.getOrbitCircleCollision(mousePoint);
            if (!!Object.entries(collidingCircle).length) {
                // mouse collision with a planet
                const collidingPlanet = this.getCollidedPlanet();

                if (!!Object.entries(this.collidingPlanet).length && this.collidingPlanet != this.viewPlanet) {
                    this.resetCircleStroke(this.collidingPlanet.orbitCircle, this._orbitStrokeColour, this._orbitStrokeWidth);
                }

                this.collidingPlanet = collidingPlanet;
                if (this.collidingPlanet != this.viewPlanet) {
                    this.highlightCircle(collidingPlanet.orbitCircle, this._highlightOrbitColour, this._hightlightOrbitWidth);
                }

                this.setCursor('pointer');
            } else if (!!Object.entries(collidingOrbit).length) {
                // mouse collision with an orbit circle

                if (!!Object.entries(this.collidingPlanet).length && this.collidingPlanet != this.viewPlanet) {
                    this.resetCircleStroke(this.collidingPlanet.orbitCircle, this._orbitStrokeColour, this._orbitStrokeWidth);
                }

                this.collidingPlanet = collidingOrbit;
                this.collidingPlanet.collided = true;
                if (this.collidingPlanet != this.viewPlanet) {
                    this.highlightCircle(this.collidingPlanet.circle);
                    this.highlightCircle(this.collidingPlanet.orbitCircle, this._highlightOrbitColour, this._hightlightOrbitWidth);
                }
                this.setCursor('default');
            } else {
                // mouse collided with no objects

                this.setCursor('default');
                if (!!Object.entries(this.collidingPlanet).length && this.collidingPlanet != this.viewPlanet) {
                    this.resetCircleStroke(this.collidingPlanet.orbitCircle, this._orbitStrokeColour, this._orbitStrokeWidth);
                    this.collidingPlanet = {} as Planet;
                }
            }
        } else {
            // view planet (must do section collision)

            // let collidingSystem = this.getStarCollision(mousePoint);
            // if (!!Object.entries(collidingSystem).length) {
            //     if (collidingSystem !== this.viewSystem) {
            //         this.highlightCircle(collidingSystem.star.circle);
            //         this.collideSystem = collidingSystem;
            //     }
            //     this.setCursor('pointer');
            // } else {
            //     this.setCursor('default');
            //     if (!!Object.entries(this.collideSystem).length && this.collideSystem != this.viewSystem) {
            //         this.resetCircleStroke(this.collideSystem.star.circle)
            //         this.collideSystem = {} as SolarSystem;
            //     }
            // }
        }
        this.drawScene(true);

    }

    public onMouseClick(e: any) {
        let mousePoint = new Point(e.offsetX, e.offsetY);
        if (this.isSolarSystemView) {
            // solar system view

            const clickedCircle = this.clickCircles(mousePoint, this.planetList);
            const collidingOrbit = this.getOrbitCircleCollision(mousePoint);

            // check collision with the planets
            if (!!Object.entries(clickedCircle).length) {
                // a planet was clicked
                const clickedPlanet = this.getClickedPlanet();

                if (!!Object.entries(this.viewPlanet).length && !this.viewPlanet.clicked) {
                    // reset the currently selected planet so a new planet can be selected
                    this.resetCircleStroke(this.viewPlanet.orbitCircle, this._orbitStrokeColour, this._orbitStrokeWidth);
                }

                // set the select planet and highlight its orbit circle
                this.viewPlanet = clickedPlanet;
                this.hasClickedPlanet = true;
                this.highlightCircle(this.viewPlanet.orbitCircle, this._selectOrbitColour, this._selectOrbitWidth);

            } else if (!!Object.entries(collidingOrbit).length) {
                // mouse click on orbit circle

                if (!!Object.entries(this.viewPlanet).length && !this.viewPlanet.clicked) {
                    // reset the currently selected planet so a new planet can be selected
                    this.resetCircleStroke(this.viewPlanet.orbitCircle, this._orbitStrokeColour, this._orbitStrokeWidth);
                }

                // set the planet for the collided orbit
                // manually update planet attributes
                // force stroke colour and width to required values
                this.viewPlanet = collidingOrbit;
                this.viewPlanet.clicked = true;
                this.viewPlanet.collided = false;
                this.hasClickedPlanet = true;
                this.selectCircle(this.viewPlanet.circle);
                this.selectCircle(this.viewPlanet.orbitCircle, this._selectOrbitColour, this._selectOrbitWidth);
            } else {
                // the user clicked but not on a star or planet

                // unset the currently selected planet
                this.resetCircleStroke(this.viewPlanet.orbitCircle, this._orbitStrokeColour, this._orbitStrokeWidth);
                this.viewPlanet = {} as Planet;
                this.hasClickedPlanet = false;
            }
        } else {
            // planet view
            // must do section collision handling

            // const clickedSystem = this.getStarCollision(mousePoint);
            // if (!!Object.entries(clickedSystem).length) {
            //     if (!!Object.entries(this.viewSystem).length) {
            //         this.resetCircleStroke(this.viewSystem.star.circle);
            //     }
            //     this.selectCircle(clickedSystem.star.circle);
            //     this.viewSystem = clickedSystem;
            //     this.hasClicked = true;
            // } else {
            //     this.hasClicked = false;
            //     this.resetCircleStroke(this.viewSystem.star.circle);

            //     this.viewSystem = {} as SolarSystem;
            // }
        }

        this.drawScene();
    }

    private fixCircleStroke(circle: CircleSprite) {
        if (circle.clicked) {
            this.selectCircle(circle.circle);
        } else if (circle.collided) {
            this.highlightCircle(circle.circle);
        } else {
            this.resetCircleStroke(circle.circle);
        }
    }

    private highlightCircle(circle: CircleData, strokeColour = this._highlightStrokeColour, strokeWidth = this._highlightStrokeWidth) {
        circle.strokeColour = strokeColour;
        circle.strokeWidth = strokeWidth;
    }

    private selectCircle(circle: CircleData, strokeColour = this._selectStrokeColour, strokeWidth = this._selectStrokeWidth) {
        circle.strokeColour = strokeColour;
        circle.strokeWidth = strokeWidth;
    }

    public resetCircleStroke(circle: CircleData, strokeColour = this._circleStrokeColour, strokeWidth = this._circleStrokeWidth) {
        circle.strokeColour = strokeColour;
        circle.strokeWidth = strokeWidth;
    }

    private setCursor(type: string) {
        window.document.getElementById("solar-system").style.cursor = type;
    }

    private getOrbitCircleCollision(xy: paper.Point) {
        let collision = {} as Planet;
        for (let i = 0; i < this.planetList.length; i++) {
            if (!!Object.entries(this.planetList[i].orbitCirclePath).length && (this.planetList[i].orbitCirclePath.contains(xy))) {
                collision = this.planetList[i];
                break;
            }
        }
        return collision;
    }


    private collideCircles(xy: paper.Point, circleList: CircleSprite[]) {
        var collidedCircle = {} as CircleSprite;
        circleList.forEach((circle) => {
            const collision = circle.circlePath.contains(xy)
            circle.collided = collision;
            this.fixCircleStroke(circle);
            if (collision) {
                collidedCircle = circle;
            }
        });
        return collidedCircle;
    }

    private clickCircles(xy: paper.Point, circleList: CircleSprite[]) {
        var clickedCircle = {} as CircleSprite;
        circleList.forEach((circle) => {
            const clicked = circle.circlePath.contains(xy);
            circle.clicked = clicked;

            this.fixCircleStroke(circle);
            if (clicked) {
                clickedCircle = circle;
            }
        });
        return clickedCircle;
    }

    private getCollidedPlanet() {
        var collision = {} as Planet

        this.planetList.forEach((planet) => {
            if (planet.collided) {
                collision = planet;
            }
        });

        return collision;
    }

    private getClickedPlanet() {
        var clicked = {} as Planet

        this.planetList.forEach((planet) => {
            if (planet.clicked) {
                clicked = planet;
            }
        });

        return clicked;
    }

    private getRandomCircle(point: paper.Point, minSize: number, maxSize: number): CircleData {
        let fillColour = this.getRandomColourCode();
        let size = randInt(minSize, maxSize)
        return this.getCircle(
            point,
            size,
            fillColour,
        )
    }

    public createPlanetList() {
        this.planetList = [];

        let angleCtr = 0;
        let addOrbitDist = 40;
        let maxOrbitDist = 500;
        let orbitCtr = 0;
        const minOrbitDist = 40;
        const midPoint = this.getCanvasMidPoint();

        for (let i = 0; i < 5; i++) {

            let orbitDist = (minOrbitDist * this._viewSystemZoom) + ((++orbitCtr * addOrbitDist) % maxOrbitDist)
            let angle = angleCtr;

            angleCtr += this._addOrbitAngle;

            let planetPoint = getCirclePoint(this.getCanvasMidPoint(), orbitDist, angle);
            let orbitCircle = this.getCircle(this.getCanvasMidPoint(), orbitDist, '', this._orbitStrokeColour, this._orbitStrokeWidth);
            let planetCircle = this.getRandomCircle(planetPoint, 15, 20);

            const planet: Planet = {
                id: i,
                size: planetCircle.radius,
                circle: planetCircle,
                orbitCircle: orbitCircle,
                offset: {
                    x: midPoint.x - planetCircle.center.x,
                    y: midPoint.y - planetCircle.center.y,
                } as paper.Point,
                name: 'Planet ' + (i),
                circlePath: {} as paper.Path,
                orbitCirclePath: {} as paper.Path,
                clicked: false,
                collided: false,
                speed: 3 / (i + randInt(1, 5))
            }
            this.planetList.push(planet);
        }
    }

    private getCircle(center: paper.Point, radius: number, fillColour = 'yellow', strokeColour = this._circleStrokeColour, strokeWidth = this._circleStrokeWidth): CircleData {
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

    private drawText(xy: paper.Point, content: string, x_offset: number, y_offset: number) {
        const point = {
            x: xy.x + x_offset,
            y: xy.y + y_offset
        }

        const pt = new PointText({
            point,
            content,
            fillColor: this._textColour,
            fontFamily: this._textFont,
            fontSize: this._textSize,
        });
    }

    public drawPlanets(planets: Planet[]) {
        planets.forEach((planet) => {
            planet.orbitCirclePath = this.drawCirclePath(planet.orbitCircle);
        });

        planets.forEach((planet) => {
            planet.circle = this.getCircle(planet.circle.center, planet.circle.radius, planet.circle.fillColour, planet.circle.strokeColour, planet.circle.strokeWidth);
            planet.circlePath = this.drawCirclePath(planet.circle);
        });

        return planets;
    }


    private getCanvasMidPoint(): paper.Point {
        return new Point(
            this.canvas.nativeElement.clientWidth / 2,
            this.canvas.nativeElement.clientHeight / 2
        );
    }


    private getRandomColourCode() {
        let makeColorCode = '0123456789ABCDEF';
        let code = '#';
        for (let count = 0; count < 6; count++) {
            code = code + makeColorCode[Math.floor(Math.random() * 16)];
        }
        return code;
    }

    private planetsOrbitStar() {
        for (var i = 0; i < this.planetList.length; i++) {
            if (this.planetList[i].collided || this.planetList[i].clicked) {
                // dont animate any planets that have collided or clicked
                continue;
            }

            if (Object.keys(this.orbitTracker).includes(this.orbitTracker[i])) {
                this.orbitTracker[i]++;
            } else {
                this.orbitTracker[i] = 1
            }

            var orbitSpeed = this.orbitTracker[i];
            var angle = getAngle(this.getCanvasMidPoint(), this.planetList[i].circle.center);
            angle = angle + orbitSpeed * this.planetList[i].speed / this.planetList[i].size;
            angle = (Math.PI * angle) / 180;

            this.planetList[i].circle.center = getCirclePoint(
                this.getCanvasMidPoint(),
                getDistance(this.getCanvasMidPoint(), this.planetList[i].circle.center),
                angle
            );
        }
    }


}