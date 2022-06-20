import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  @Input() data: any;
  url: any;

  constructor() { }

  ngOnInit(): void {
    this.readFile();
  }

  readFile(){
    this.url = this.data.image;
  }
}
