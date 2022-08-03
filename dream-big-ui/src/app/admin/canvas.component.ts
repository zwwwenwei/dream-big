import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html'
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvas')
    canvas: ElementRef<HTMLCanvasElement> = {} as ElementRef<HTMLCanvasElement>;
    public context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
    cat1: number = 10
    cat2: number = 10
    cat3: number = 10
    cat4: number = 10
    cat5: number = 10
    star_size: number = 5
    c_x: number = 400;
    c_y: number = 200;
    rotation: number = 0;

    ngAfterViewInit(): void {
        this.context = this.canvas.nativeElement.getContext('2d')!;
        this.makeDrawStar();
    }

    public submitStarChanges() {
        this.makeDrawStar();
    }

    public makeDrawStar() {
        console.log('redrawing star');
        this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

        // not a great way to rotate...
        // should try to rotate star before drawing it
        // this.context.translate(this.c_x, this.c_y);
        // this.context.rotate(this.rotation*(Math.PI/180));
        // this.context.translate(-this.c_x, -this.c_y);

        const star_coords = this.drawStar(this.c_x, this.c_y, 5, this.star_size * 5 * 8, this.star_size * 5 * 3);

        const colours = [
            'red',
            'pink',
            'orange',
            'blue',
            'green'
        ]
        const scores = [
            this.cat1, //red
            this.cat2, //pink
            this.cat3,  //orange
            this.cat4, //blue
            this.cat5 //green
        ]
        var prev_x = star_coords[star_coords.length - 1].edge_x;
        var prev_y = star_coords[star_coords.length - 1].edge_y;
        for (var i = 0; i < 5; i++) {
            var score = scores[i];
            // scale the score between 1-100 and ensure it can't escape the star
            // these magic numbers should be replaced with constants
            score = Math.min(this.star_size * 5 * 8 / 100 * score, this.star_size * 5 * 8 / 100 * 100);

            const p_xy = this.calculateLinePoint(this.c_x, this.c_y, star_coords[i].point_x, star_coords[i].point_y, score)
            const points = star_coords[i];

            this.drawCatScore(this.c_x, this.c_y, p_xy.x, p_xy.y, points.edge_x, points.edge_y, prev_x, prev_y, colours[i]);
            prev_x = points.edge_x;
            prev_y = points.edge_y;
        }
    }


    /**
     * Finds the point on a line given by two coordinates that is distance units away from x1,y1
     * 
     * @param x1 x1 position on given line
     * @param y1 y1 position on given line
     * @param x2 x2 position on given line
     * @param y2 y2 position on given line
     * @param distance the distance to travel on the given line to find the desired point
     * @returns a point on the given line that is distance units along it
     */
    private calculateLinePoint(x1: number, y1: number, x2: number, y2: number, distance: number) {
        var vx = x2 - x1;
        var vy = y2 - y1;
        var mag = Math.sqrt(vx * vx + vy * vy);
        vx /= mag;
        vy /= mag;
        var px = x1 + vx * (distance);
        var py = y1 + vy * (distance);
        return { x: px, y: py }
    }


    private drawCatScore(cx: number, cy: number, px: number, py: number, x1: number, y1: number, x2: number, y2: number, colour: string) {
        this.context.beginPath();
        this.context.moveTo(cx, cy);
        this.context.lineTo(x2, y2);
        this.context.lineTo(px, py);
        this.context.lineTo(x1, y1);
        this.context.moveTo(cx, cy);

        this.context.closePath();
        this.context.lineWidth = 1;

        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.fillStyle = colour;
        this.context.fill();
    }

    private drawStar(cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number) {
        // use a ratio of 8:3 for outerRadius:innerRadius to get desired star shape

        var rot = Math.PI / 2 * 3;
        var x = cx;
        var y = cy;
        var step = Math.PI / spikes;

        this.context.strokeStyle = "#000";
        this.context.beginPath();
        this.context.moveTo(cx, cy - outerRadius)
        const star_coords: any[] = [];

        for (var i = 0; i < spikes; i++) {
            let spike_coords = {
                point_x: 0,
                point_y: 0,
                edge_x: 0,
                edge_y: 0,
            }

            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            spike_coords.point_x = x;
            spike_coords.point_y = y;
            this.context.lineTo(x, y)
            rot += step

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            spike_coords.edge_x = x;
            spike_coords.edge_y = y;
            this.context.lineTo(x, y)
            rot += step

            star_coords.push(spike_coords);
        }

        this.context.lineTo(cx, cy - outerRadius)
        this.context.closePath();
        this.context.lineWidth = 5;
        this.context.strokeStyle = 'blue';
        this.context.stroke();
        this.context.fillStyle = 'skyblue';
        this.context.fill();
        return star_coords;
    }
}