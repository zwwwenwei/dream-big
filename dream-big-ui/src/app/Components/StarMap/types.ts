
export interface Star {
    id: number,
    size: number;
    planets: Planet[];
    circle: CircleData;
    circlePath: paper.Path;
}

export interface CircleData {

    center: paper.Point,
    radius: number,
    fillColour: string,
    strokeColour: string,
    strokeWidth: number,

}

export interface Planet {
    id: number,
    size: number,
    circle: CircleData;
    circlePath: paper.Path;
    offset: paper.Point;
}