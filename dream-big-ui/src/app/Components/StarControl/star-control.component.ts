import { Component, ViewChild, OnInit } from '@angular/core';
import words from '../../../assets/words.json';


import { StarComponent } from '../Star/star.component';
import { Category } from '../Star/types';
import { MatDialog } from '@angular/material/dialog';
import { RgbPickerComponent } from 'src/app/rgb-picker/rgb-picker.component';

@Component({
    selector: 'app-star-control',
    templateUrl: './star-control.component.html',
    styleUrls: ['./star-control.component.scss']
})
export class StarControlComponent implements OnInit {
    constructor(public dialog: MatDialog) { }

    openDialog(): void {
        const dialogRef = this.dialog.open(RgbPickerComponent, {
            width: '250px',
            data: this.polygonFillColour,
        });

        dialogRef.afterClosed().subscribe(result => {
            this.polygonFillColour = result;
            console.log('The dialog was closed', result);
        });
    }

    @ViewChild(StarComponent) star: StarComponent = {} as StarComponent;
    categories: Array<Category> = [];
    polygonFillColour: string = '#EADA87';

    setCategories: Array<Category> = [
        {
            name: "Experience",
            score: 10,
            colour: "#74DB83",
        },
        {
            name: "Knowledge",
            score: 10,
            colour: "#62D6EA",
        },
        {
            name: "Employability",
            score: 10,
            colour: "#EA7662",
        },
        {
            name: "Readiness",
            score: 10,
            colour: "#DB74CD",
        },
        {
            name: "Networking",
            score: 10,
            colour: "#F3EA6D",
        },
    ]
    starSize: number = 20;
    centrePoint: paper.Point = { } as paper.Point;
    rotation: number = 0;
    numSpikes: number = 5;
    outerRatio: number = 8;
    innerRatio: number = 3;
    minScore: number = 20;

    ngOnInit(): void {
        this.centrePoint = {
            x:  window.document.getElementById('c-div')?.clientWidth!/3,
            y: window.document.getElementById('c-div')?.clientHeight!/2

        } as paper.Point
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


    public onInputChange() {

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