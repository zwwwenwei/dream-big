import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { getAngle, getBackgroundStars, getCatPolygons, getCirclePoint, getDistance, getRandomColourCode, getStarData, randInt } from 'src/app/helpers/canvas';
import { BgStar, Polygon, StarData, Category, StarCoord } from 'src/app/helpers/types';
import { Point, CircleData, Planet, SolarSystem } from 'src/app/helpers/types';
import Konva from 'konva';

import { CIRCLE_STROKE_COLOUR, CIRCLE_STROKE_WIDTH, HIGHLIGHT_CIRCLE_STROKE_COLOUR, HIGHLIGHT_CIRCLE_STROKE_WIDTH, HIGHLIGHT_ORBIT_CIRCLE_COLOUR, HIGHLIGHT_ORBIT_CIRCLE_WIDTH, NUM_BG_STARS, ORBIT_CIRCLE_STROKE_COLOUR, ORBIT_CIRCLE_STROKE_WIDTH, SELECT_CIRCLE_STROKE_COLOUR, SELECT_CIRCLE_STROKE_WIDTH } from './constants';
@Component({
    selector: 'app-solar-system',
    templateUrl: './solar-system.component.html',
    styleUrls: ['./solar-system.component.scss']

})
export class SolarSystemComponent implements AfterViewInit {
    // @Input() loadedStarSystems!: any[];

    private stage: Konva.Stage;
    private bgLayer: Konva.Layer;
    private planetLayer: Konva.Layer;
    private starLayer: Konva.Layer;
    private planetImageList: HTMLImageElement[] = [];
    private planetList: Planet[] = [];
    private bgStarList: BgStar[] = [];
    private viewSystem: SolarSystem = {} as SolarSystem;
    private viewPlanet: Planet = {} as Planet;
    private isSolarSystemView: boolean = true;

    private orbitTracker: any = {}
    private animationId: number = -1;
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



    ngAfterViewInit(): void {
        this.stage = new Konva.Stage({
            container: 'container',   // id of container <div>
            width: window.document.getElementById('container').clientWidth,
            height: window.document.getElementById('container').clientHeight,
        });

        this.bgLayer = new Konva.Layer();
        this.planetLayer = new Konva.Layer();
        this.starLayer = new Konva.Layer();

        this.bgStarList = getBackgroundStars(NUM_BG_STARS, window.document.getElementById('container').clientWidth, window.document.getElementById('container').clientWidth);
        this.addBgStarsToLayer();

        this.starData = getStarData(
            this.setCategories,
            this.getCanvasMidPoint(),
            10
        );
        this.catPolygons = getCatPolygons(this.starData);


        var starGroup = this.getStarGroup(this.starData.starCoords, { x: 0, y: 0 }, 'gold');
        this.starLayer.add(starGroup);
        // turn off events for the background layer
        this.bgLayer.listening(false);

        this.planetList = this.createPlanetList();
        this.addPlanetsToLayer();

        this.stage.add(this.bgLayer);
        this.stage.add(this.planetLayer);
        this.stage.add(this.starLayer);

        // setTimeout(() => {
        //     this.drawScene(true);
        // }, 0);
    }

    public drawScene(animate = false) {

    }


    // private highlightCircle(circle: CircleData, strokeColour = HIGHLIGHT_CIRCLE_STROKE_COLOUR, strokeWidth = HIGHLIGHT_CIRCLE_STROKE_WIDTH) {
    //     circle.strokeColour = strokeColour;
    //     circle.strokeWidth = strokeWidth;
    // }

    // private selectCircle(circle: CircleData, strokeColour = SELECT_CIRCLE_STROKE_COLOUR, strokeWidth = SELECT_CIRCLE_STROKE_WIDTH) {
    //     circle.strokeColour = strokeColour;
    //     circle.strokeWidth = strokeWidth;
    // }

    // public resetCircleStroke(circle: CircleData, strokeColour = CIRCLE_STROKE_COLOUR, strokeWidth = CIRCLE_STROKE_WIDTH) {
    //     circle.strokeColour = strokeColour;
    //     circle.strokeWidth = strokeWidth;
    // }


    private getRandomCircle(point: Point, minSize: number, maxSize: number): CircleData {
        let fillColour = getRandomColourCode();
        let size = randInt(minSize, maxSize)
        return this.getCircle(
            point,
            size,
            fillColour,
        )
    }

    public createPlanetList() {
        const planetList = [];

        let angleCtr = 0;
        let addOrbitDist = 40;
        let maxOrbitDist = 500;
        let orbitCtr = 0;
        const minOrbitDist = 40;
        const midPoint = this.getCanvasMidPoint();

        for (let i = 0; i < randInt(2, 7); i++) {

            let orbitDist = (minOrbitDist * this._viewSystemZoom) + ((++orbitCtr * addOrbitDist) % maxOrbitDist)
            let angle = angleCtr;

            angleCtr += this._addOrbitAngle;

            let planetPoint = getCirclePoint(this.getCanvasMidPoint(), orbitDist, angle);
            let orbitCircle = this.getCircle(this.getCanvasMidPoint(), orbitDist, '', ORBIT_CIRCLE_STROKE_COLOUR, ORBIT_CIRCLE_STROKE_WIDTH);
            let planetCircle = this.getRandomCircle(planetPoint, 15, 20);

            let imgPath = `assets/Planets/planet-${randInt(1, 8)}.png`
            var planetImgObj = new Image();
            planetImgObj.src = imgPath;

            const planet: Planet = {
                id: i,
                size: planetCircle.radius,
                circle: planetCircle,
                orbitCircle: orbitCircle,
                offset: {
                    x: midPoint.x - planetCircle.center.x,
                    y: midPoint.y - planetCircle.center.y,
                } as Point,
                name: 'Planet ' + (i),
                kplanetCircle: {} as Konva.Circle,
                korbitCircle: {} as Konva.Circle,
                clicked: false,
                collided: false,
                speed: 1,
                lostFrames: 0,
                image: planetImgObj,
                imagePath: imgPath
            }
            planetList.push(planet);
        }
        return planetList
    }

    private getCircle(center: Point, radius: number, fillColour = 'yellow', strokeColour = CIRCLE_STROKE_COLOUR, strokeWidth = CIRCLE_STROKE_WIDTH): CircleData {
        return {
            center,
            radius,
            fillColour,
            strokeColour,
            strokeWidth
        };
    }

    private addPlanetsToLayer() {
        this.planetLayer.destroyChildren();
        const planetCircles = [];
        const planetImgs = [];
        const planetList = this.planetList;
        for (let i = 0; i < planetList.length; i++) {
            const planet = planetList[i];
            var planetCircle = new Konva.Circle({
                x: planet.circle.center.x,
                y: planet.circle.center.y,
                stroke: planet.circle.strokeColour,
                strokeWidth: planet.circle.strokeWidth,
                radius: planet.circle.radius
            });
            var planetImg = new Konva.Image({
                image: planet.image,
                x: planet.circle.center.x - planet.circle.radius,
                y: planet.circle.center.y - planet.circle.radius,
                width: planet.circle.radius*2,
                height: planet.circle.radius*2,
            });

            this.planetLayer.add(planetCircle);
            this.planetLayer.add(planetImg);

            planetCircle.on('mouseover', function () {
                planet.collided = true;
                this.setAttr('stroke', HIGHLIGHT_CIRCLE_STROKE_COLOUR);
                this.setAttr('strokeWidth', HIGHLIGHT_CIRCLE_STROKE_WIDTH);
                this.moveToTop();
            });
            planetCircle.on('mouseout', function () {
                planet.collided = false;
                this.setAttr('stroke', CIRCLE_STROKE_COLOUR);
                this.setAttr('strokeWidth', CIRCLE_STROKE_WIDTH);
            });

            var orbitCircle = new Konva.Circle({
                x: planet.orbitCircle.center.x,
                y: planet.orbitCircle.center.y,
                stroke: planet.orbitCircle.strokeColour,
                strokeWidth: planet.orbitCircle.strokeWidth,
                fill: planet.orbitCircle.fillColour,
                radius: planet.orbitCircle.radius
            });
            this.planetLayer.add(orbitCircle);

            // orbitCircle.on('mouseover', function () {
            //     planet.collided = true;
            //     this.setAttr('stroke', HIGHLIGHT_ORBIT_CIRCLE_COLOUR);
            //     this.setAttr('strokeWidth', HIGHLIGHT_ORBIT_CIRCLE_WIDTH);
            // });
            // orbitCircle.on('mouseout', function () {
            //     this.setAttr('stroke', ORBIT_CIRCLE_STROKE_COLOUR);
            //     this.setAttr('strokeWidth', ORBIT_CIRCLE_STROKE_WIDTH);
            //     planet.collided = false;
            // });


            planetImgs.push(planetImg);
            planetCircles.push(planetCircle);
            orbitCircle.moveToBottom();
            planetCircle.moveToTop();
        }
        var midpoint = this.getCanvasMidPoint();
        var animation = new Konva.Animation(function (frame) {
            for (var i = 0; i < planetList.length; i++) {
                if (!planetList[i].collided) {
                    var angle = getAngle(midpoint, planetList[i].circle.center);
                    var add = ((frame.time - planetList[i].lostFrames) / 10) * planetList[i].speed / planetList[i].size;
                    angle = angle + add;
                    angle = (Math.PI * angle) / 180;
                    var newCentre = getCirclePoint(
                        midpoint,
                        getDistance(midpoint, planetList[i].circle.center),
                        angle
                    );
                    planetCircles[i].x(newCentre.x);
                    planetCircles[i].y(newCentre.y);
                    planetImgs[i].x(newCentre.x - planetList[i].circle.radius);
                    planetImgs[i].y(newCentre.y - planetList[i].circle.radius);
                } else {
                    planetList[i].lostFrames += frame.timeDiff;
                }
            }
        }, this.planetLayer);
        animation.start();
    }


    private getCanvasMidPoint(): Point {
        return {
            x: window.document.getElementById('container').clientWidth / 2,
            y: window.document.getElementById('container').clientHeight / 2
        };
    }

    private addBgStarsToLayer() {
        this.bgLayer.destroyChildren();
        var rect = new Konva.Rect({
            x: 0,
            y: 0,
            width: window.document.getElementById('container').clientWidth,
            height: window.document.getElementById('container').clientHeight,
            fill: 'black'
        });
        this.bgLayer.add(rect);

        for (let i = 0; i < this.bgStarList.length; i++) {
            const bgStar = this.bgStarList[i];
            var starCircle = new Konva.Circle({
                x: bgStar.center.x,
                y: bgStar.center.y,
                radius: bgStar.radius,
                opacity: bgStar.brightness / 10,
                fill: 'white'
            });

            this.bgLayer.add(starCircle);
        }
    }

    private getStarGroup(starCoords: StarCoord[], center: Point, polyFillColour: string): Konva.Group {
        var starGroup = new Konva.Group({
            x: center.x,
            y: center.y
        });

        for (var i = 0; i < this.catPolygons.length; i++) {
            const poly = this.catPolygons[i];

            var polygon = new Konva.Shape({
                x: center.x,
                y: center.y,
                fill: polyFillColour,
                stroke: 'black',
                strokeWidth: 0,
                // a Konva.Canvas renderer is passed into the sceneFunc function
                sceneFunc(context, shape) {
                    context.beginPath();
                    context.moveTo(poly.points.centre.x, poly.points.centre.y);
                    context.lineTo(poly.points.edgeL.x, poly.points.edgeL.y);
                    context.lineTo(poly.points.spike.x, poly.points.spike.y);
                    context.lineTo(poly.points.edgeR.x, poly.points.edgeR.y);
                    context.lineTo(poly.points.centre.x, poly.points.centre.y);
                    context.closePath();
                    // Konva specific method
                    context.fillStrokeShape(shape);
                }
            });

            var text = new Konva.Text({
                x: 10,
                y: 10,
                text: '',
                fontSize: 15,
                fontFamily: 'Arial',
                fill: 'white'
            });

            polygon.on('pointerenter', function (evt) {
                this.setAttr('stroke', poly.category.colour);
                this.setAttr('StrokeWidth', 3);
                this.moveToTop();
                text.setAttr('text', poly.category.name);
            });
            polygon.on('pointerleave', function () {
                this.setAttr('stroke', 'black');
                this.setAttr('StrokeWidth', 0);
                text.setAttr('text', '');
            });
            starGroup.add(text);
            starGroup.add(polygon);
        }

        for (var i = 0; i < starCoords.length; i++) {
            const starCoord = starCoords[i];

            var catSpike = new Konva.Shape({
                x: center.x,
                y: center.y,
                stroke: this.setCategories[i].colour,
                strokeWidth: 5,
                sceneFunc: function (context, shape) {
                    context.beginPath();
                    context.moveTo(starCoord.edgeR.x, starCoord.edgeR.y)
                    context.lineTo(starCoord.spike.x, starCoord.spike.y)
                    context.lineTo(starCoord.edgeL.x, starCoord.edgeL.y)
                    context.strokeShape(shape);
                }
            });
            starGroup.add(catSpike);
        }

        return starGroup;
    }
}

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}