import { Component, ViewChild, OnInit } from '@angular/core';
import words from '../../../assets/words.json';


// import { StarComponent } from '../Star/star.component';
// import { Category } from '../Star/types';
import { Category } from 'src/app/helpers/types';
import { MatDialog } from '@angular/material/dialog';
import { Point } from 'src/app/helpers/types';
import { KonvStarComponent } from '../KonvaStar/konv-star.component';

@Component({
    selector: 'app-star-control',
    templateUrl: './star-control.component.html',
    styleUrls: ['./star-control.component.scss']
})
export class StarControlComponent implements OnInit {
    constructor(public dialog: MatDialog) { }

    // @ViewChild(StarComponent) star: StarComponent = {} as StarComponent;
    @ViewChild(KonvStarComponent) star: KonvStarComponent = {} as KonvStarComponent;

    polygonFillColour: string = '#EADA87';

    categories: Array<Category> = [];
    setCategories: Array<Category> = [
        {
            name: "Experience",
            score: 0,
            colour: "#74DB83",
        },
        {
            name: "Knowledge",
            score: 0,
            colour: "#62D6EA",
        },
        {
            name: "Employability",
            score: 0,
            colour: "#EA7662",
        },
        {
            name: "Readiness",
            score: 0,
            colour: "#DB74CD",
        },
        {
            name: "Networking",
            score: 0,
            colour: "#F3EA6D",
        },
    ]
    starSize: number = 20;
    centrePoint: Point = {} as Point;
    rotation: number = 0;
    numSpikes: number = 5;
    outerRatio: number = 8;
    innerRatio: number = 3;
    minScore: number = 20;

    ngOnInit(): void {
        this.centrePoint = {
            // x:0,
            // y: 0
            x: window.document.getElementById('container').clientWidth / 5,
            y: window.document.getElementById('container').clientHeight / 3

        } as Point;
        this.resetCategories();
    }

    public resetCategories() {
        this.categories = [...this.setCategories];
        this.categories.forEach((cat) => {
            cat.score = 0;
        })
        this.numSpikes = this.categories.length;
        this.rotation = 0;
        this.starSize = 20;
        this.innerRatio = 3;
        this.outerRatio = 8;
        this.minScore = 20;
        this.onInputChange();
    }

    public addCategory() {
        let category = {
            name: words[this.getRandomNumberBetween(0, words.length - 1)],
            score: 0,
            colour: this.getRandomColourCode()
        }
        this.categories.push(category);
    }

    public changeSpikes(e: any) {
        if (e.data < this.categories.length) {
            this.removeCategory();
        } else {
            this.addCategory();
        }
        this.onInputChange();
    }

    public removeCategory() {
        this.categories.pop();
    }

    public onInputChange() {
        // ensure all values in parent have finished updating before redrawing star
        setTimeout(() => {
            this.star.drawScene(true);
        }, 0);
    }

    public randomise() {

        this.categories.forEach((cat) => {
            cat.score = this.getRandomNumberBetween(0, 100);
        });

        // ensure all values in parent have finished updating before redrawing star
        setTimeout(() => {
            this.star.drawScene(true);
        }, 0);
    }


    private getRandomColourCode() {
        var makeColorCode = '0123456789ABCDEF';
        var code = '#';
        for (var count = 0; count < 6; count++) {
            code = code + makeColorCode[Math.floor(Math.random() * 16)];
        }
        return code;
    }

    private getRandomNumberBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}