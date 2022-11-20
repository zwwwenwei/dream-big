import { BgStar, Category, Polygon, StarCoord, StarData, Point } from "./types";

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

export function getCirclePoint(center: Point, radius: number, angle: number): Point {
	return {
		x: center.x + (radius * Math.cos(angle)),
		y: center.y + (radius * Math.sin(angle)),
	}
}

export function getDistance(point1: Point, point2: Point) {
	return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2)
}

export function getAngle(point1: Point, point2: Point) {
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


/**
* @param score 
* @returns score scaled to ensure a minimum inner star size
*/
export function getScaledMinScore(score: number, minScore = 20) {
	let newScore = minScore - ((score / 100) * minScore)
	return score + newScore;
}

export function getBackgroundStars(numStars: number, width: number, height: number): BgStar[] {
	const bgStars: BgStar[] = [];
	for (let i = 0; i < numStars; i++) {
		const x = randInt(0, width);
		const y = randInt(0, height);
		const brightness = randInt(0, 7) + Math.random();
		const radius = randInt(0, 2) + Math.random();
		bgStars.push({
			center: {x, y},
			brightness,
			radius
		});
	}
	return bgStars
}

export function getCatPolygons(starData: StarData) {
	const categories = starData.categories;

	let catPolygons: Polygon[] = [];

	var prevCategory = categories[categories.length - 1];

	for (var i = 0; i < categories.length; i++) {
		/**
		 * it needs to calculate where to place the inner spikes of the inner star.
		 * to do this, it will draw a line from the centre of the star to an inner spike of the outer star
		 * the inner star's inner spike point will be a point along this line.
		 * it then scales category score to ensure it can never be larger than the outer star's spike length
		 * the scaled score can then be used to find the point along a line which is scaled score distance away from the centre point of the star
		 * 
		 * also need to inspect the previous and next categories, as this polygon will share an inner spike with each of them.
		 * choose the inner spike locations by calculating the scores of the previous, current and next category.
		 * determine whether to use this polygon, the previous, or the next one's inner spike length by using the maximum value
		 * 
		 * then find the points along the lines towards the outer star's inner spikes. do this for the left and right inner spikes.
		 */
		const nextCategory = i == categories.length - 1 ? categories[0] : categories[i + 1];

		const starCoord = starData.starCoords[i];

		// use getScore to scale the score to give the inner star a minimum size
		var score = getScaledMinScore(categories[i].score)
		// the previous and next scores are retrieved to allow for the resizing of polygon edges
		var prevScore = getScaledMinScore(prevCategory.score);
		var nextScore = getScaledMinScore(nextCategory.score);

		// all scores must be scaled to fit within the star
		const scaledOuterScore = ((starData.size * starData.outerRatio) / 100) * score;
		const scaledInnerScore = (starData.size * starData.innerRatio / 100) * score;
		const scaledPrevInnerScore = (starData.size * starData.innerRatio / 100) * prevScore;
		const scaledNextInnerScore = (starData.size * starData.innerRatio / 100) * nextScore;

		var outerSpikeLength = Math.min(scaledOuterScore, starData.size * starData.outerRatio);

		// find all the possible inner spike lengths
		var innerSpikeLength = Math.min(scaledInnerScore, starData.size * starData.innerRatio);
		var prevInnerSpikeLength = Math.min(scaledPrevInnerScore, starData.size * starData.innerRatio);
		var nextInnerSpikeLength = Math.min(scaledNextInnerScore, starData.size * starData.innerRatio);

		let maxEdgeLengthL, maxEdgeLengthR;
		// determine the max length between this polygon and its neighbours
		maxEdgeLengthL = Math.max(prevInnerSpikeLength, innerSpikeLength);
		maxEdgeLengthR = Math.max(nextInnerSpikeLength, innerSpikeLength)

		// calculate the points on the corresponding inner spike lines, using the maximum edge length for each inner spike
		const edgeL = calculateLinePoint(starData.centre.x, starData.centre.y, starCoord.edgeL.x, starCoord.edgeL.y, maxEdgeLengthL);
		const edgeR = calculateLinePoint(starData.centre.x, starData.centre.y, starCoord.edgeR.x, starCoord.edgeR.y, maxEdgeLengthR);
		const scoreXY = calculateLinePoint(starData.centre.x, starData.centre.y, starCoord.spike.x, starCoord.spike.y, outerSpikeLength);

		catPolygons.push({
			points: {
				spike: scoreXY,
				edgeR: edgeL,
				edgeL: edgeR,
				centre: starData.centre,
			},
			highlight: false,
			category: categories[i],
			path: {},
		});
		prevCategory = categories[i];
	}
	return catPolygons;
}

// export function drawCatPolygons(catPolygons: Polygon[], fillColor = '#EADA87', strokeColour = 'black', strokeWidth = 1, highlightWidth = 3) {
// 	for (var i = 0; i < catPolygons.length; i++) {
// 		const poly = catPolygons[i];

// 		var polyPath = new Path();
// 		polyPath.moveTo(poly.points.centre);
// 		polyPath.lineTo(poly.points.edgeL);
// 		polyPath.lineTo(poly.points.spike);
// 		polyPath.lineTo(poly.points.edgeR);
// 		polyPath.lineTo(poly.points.centre);
// 		polyPath.closePath();

// 		polyPath.strokeWidth = strokeWidth;
// 		polyPath.strokeColor = new Color(strokeColour);

// 		if (poly.highlight) {
// 			polyPath.strokeWidth = highlightWidth;
// 			polyPath.strokeColor = new Color(poly.category.colour);
// 		}
// 		polyPath.fillColor = new Color(fillColor);
// 		catPolygons[i].path = polyPath;
// 	}
// }

export function getStarData(categories: Category[], centre: Point, size = 20, rotation = 0, outerRatio = 8, innerRatio = 3): StarData {
	// one spike for each category
	const spikes = categories.length;

	var outerRadius = size * outerRatio;
	var innerRadius = size * innerRatio;

	var rotationRadians = rotation * Math.PI / 180;
	var rot = (Math.PI / 2 * 3) + rotationRadians;
	var step = Math.PI / spikes;

	var x = centre.x + Math.cos(rot) * outerRadius;
	var y = centre.y + Math.sin(rot) * outerRadius;

	var prevEdge = {
		x: centre.x + Math.cos(rot + (step * (spikes * 2 - 1))) * innerRadius,
		y: centre.y + Math.sin(rot + (step * (spikes * 2 - 1))) * innerRadius
	};

	const starCoords: StarCoord[] = [];

	for (var i = 0; i < spikes; i++) {
		let starCoord: StarCoord = {
			spike: { x: 0, y: 0 },
			edgeR: { x: 0, y: 0 },
			edgeL: { x: 0, y: 0 },
			category: categories[i]
		};

		x = centre.x + Math.cos(rot) * outerRadius;
		y = centre.y + Math.sin(rot) * outerRadius;
		starCoord.spike.x = x;
		starCoord.spike.y = y;

		rot += step

		x = centre.x + Math.cos(rot) * innerRadius;
		y = centre.y + Math.sin(rot) * innerRadius;

		starCoord.edgeR.x = x;
		starCoord.edgeR.y = y;
		starCoord.edgeL = prevEdge;
		rot += step

		starCoords.push(starCoord);
		prevEdge = { x, y }
	}

	return {
		starCoords,
		centre,
		rotation,
		size,
		outerRatio,
		innerRatio,
		categories
	} as StarData
}

