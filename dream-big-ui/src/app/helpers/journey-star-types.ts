

export interface Category {
    name: string;
    score: number;
    colour: string;
}


export interface PolygonPoints {
    spike: paper.Point;
    edgeL: paper.Point;
    edgeR: paper.Point;
    centre: paper.Point;


}
export interface Polygon {
    points: PolygonPoints

    highlight: boolean;
    category: Category;
    path: paper.Path;
}

export interface StarCoord {
    spike: paper.Point;
    edgeL: paper.Point;
    edgeR: paper.Point;
    category: Category;
}

export interface StarData {
    starCoords: StarCoord[];
    outerRatio: number;
    innerRatio: number;
    size: number;
    rotation: number;
    centre: paper.Point;
    categories: Category[];
    catPolygons: Polygon[];
}

export interface BgStar{
    center: paper.Point;
    outerRatio: number;
    innerRatio: number;
    size: number;
    numPoints: number;
}
