import { Component, ViewChild, OnInit } from '@angular/core';
import words from '../../../assets/words.json';


import { StarComponent } from '../Star/star.component';
import { Category } from '../Star/types';


@Component({
    selector: 'app-star-control',
    templateUrl: './star-control.component.html'
})
export class StarControlComponent implements OnInit {
    @ViewChild(StarComponent) star: StarComponent = {} as StarComponent;
    categories: Array<Category> = [];

    setCategories: Array<Category> = [
        {
            name: "Experience",
            score: 10,
            colour: "green",
        },
        {
            name: "Knowledge",
            score: 10,
            colour: "blue",
        },
        {
            name: "Employability",
            score: 10,
            colour: "red",
        },
        {
            name: "Readiness",
            score: 10,
            colour: "purple",
        },
        {
            name: "Networking",
            score: 10,
            colour: "yellow",
        },
    ]
    starSize: number = 20;
    centrePoint: paper.Point = { x: 400, y: 250 } as paper.Point;
    rotation: number = 0;
    numSpikes: number = 5;
    outerRatio: number = 8;
    innerRatio: number = 3;

    ngOnInit(): void {
        // this.createCategories();
    }

    public createCategories() {
        this.categories = [];
        for (var i = 0; i < this.numSpikes; i++) {
            const cat = {
                name: words[this.getRandomNumberBetween(0, words.length - 1)],
                score: 10,
                colour: this.getRandomColourCode()
            }
            this.categories.push(cat);
        }
    }

    public onInputChange(recreateCategories = false) {
        if (recreateCategories) {
            this.createCategories();
        }

        // ensure all values in parent have finished updating before redrawing star
        setTimeout(() => {
            this.star.drawScene(true);
        }, 0);
    }

    public randomise() {
        if (this.categories.length) {
            this.createCategories();
            this.categories.forEach((cat) => {
                cat.score = this.getRandomNumberBetween(0, 100);
            });
        } else {
            this.setCategories.forEach((cat) => {
                cat.score = this.getRandomNumberBetween(0, 100);
            });
        }


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