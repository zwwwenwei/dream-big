import { Point } from "paper/dist/paper-core";

/**
 * Find the point on a line given by two coordinates that is distance units away from x1,y1
 * 
 * @param x1 x1 position on given line
 * @param y1 y1 position on given line
 * @param x2 x2 position on given line
 * @param y2 y2 position on given line
 * @param distance the distance to travel on the given line to find the desired point
 * @returns a point on the given line that is distance units along it
 */
export function calculateLinePoint(x1: number, y1: number, x2: number, y2: number, distance: number) {
	var vx = x2 - x1;
	var vy = y2 - y1;
	var mag = Math.sqrt(vx * vx + vy * vy);
	vx /= mag;
	vy /= mag;
	var px = x1 + vx * (distance);
	var py = y1 + vy * (distance);
	return { x: px, y: py }
}

export function reorder(data: Array<any>, index: number) {
	return data.slice(index).concat(data.slice(0, index))
};

export function getCirclePoint(center: paper.Point, radius: number, angle: number) {
	// Where r is the radius, cx,cy the origin, and a the angle.
	return new Point(
		center.x + (radius * Math.cos(angle)),
		center.y + (radius * Math.sin(angle)),
	)
}

export function getDistance(point1: paper.Point, point2: paper.Point) {
	return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
}

export function getAngle(point1: paper.Point, point2: paper.Point) {
	var dy = point2.y - point1.y;
	var dx = point2.x - point1.x;
	var theta = Math.atan2(dy, dx); // range (-PI, PI]
	theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
	return theta;
}

export function getRandomColourCode() {
	let makeColorCode = '0123456789ABCDEF';
	let code = '#';
	for (let count = 0; count < 6; count++) {
		code = code + makeColorCode[Math.floor(Math.random() * 16)];
	}
	return code;
}

export function randInt(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}