

export interface Star {
    id: number,
    size: number;

    circle: StarCircle;
    circlePath : paper.Path;
}

export interface StarCircle {

    center: paper.Point,
    radius: number,
    fillColour: string,
    strokeColour: string,
    strokeWidth: number,

}