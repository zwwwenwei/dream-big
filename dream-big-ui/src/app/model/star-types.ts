export interface Point {
    x: number;
    y: number;
}

export interface Category {
    name: string;
    score: number;
    colour: string;
}

export interface Polygon {
    points: Array<Point>;
    highlight: boolean;
    category: Category;
}

export interface StarCoord {
    spike_x: number;
    spike_y: number;
    edge_x: number;
    edge_y: number;
}