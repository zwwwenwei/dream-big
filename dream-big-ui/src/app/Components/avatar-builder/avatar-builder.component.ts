import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Color, Path, Point, Project, PointText } from 'paper/dist/paper-core';

@Component({
  selector: 'app-avatar-builder',
  templateUrl: './avatar-builder.component.html',
  styleUrls: ['./avatar-builder.component.scss']
})
export class AvatarBuilderComponent implements OnInit {

  eyes: number = 1;
  eyeColour: string = "#0000FF";
  skinColour: string = "#efb096";
  nose: number = 1;
  mouth: number = 1;
  project: any;

  @ViewChild('main_canvas', { static: true }) private _main_canvas_el!: ElementRef<HTMLCanvasElement>;
  @ViewChild('eyes_canvas', { static: true }) private _eyes_canvas_el!: ElementRef<HTMLCanvasElement>;
  @ViewChild('nose_canvas', { static: true }) private _nose_canvas_el!: ElementRef<HTMLCanvasElement>;
  @ViewChild('mouth_canvas', { static: true }) private _mouth_canvas_el!: ElementRef<HTMLCanvasElement>;

  constructor() { }

  context!: CanvasRenderingContext2D;

  ngOnInit(): void {
    this.drawAvatar(this.eyeColour, this.skinColour);
  }

  public drawAvatar(color: string, skin_color: string) {

    this.context = this._main_canvas_el.nativeElement.getContext('2d')!;

    this.context.fillStyle = color || this.eyeColour;
    this.context.strokeStyle = '#0000FF';

    //this.context.fillRect(0, 100, 200, 400);
    //Torso

    this.context.beginPath();
    this.context.arc(180, 240, 92, Math.PI, Math.PI * 2);
    this.context.fill();

    //Head

    this.context.fillStyle = skin_color || this.skinColour;

    this.context.beginPath();
    this.context.arc(180, 120, 56, 0, Math.PI * 2);
    this.context.fill();

    //Arms

    this.context.strokeStyle = '#000000';

    this.context.beginPath();
    this.context.moveTo(128, 240);
    this.context.lineTo(128, 210);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(230, 240);
    this.context.lineTo(230, 210);
    this.context.stroke();
  }

}
