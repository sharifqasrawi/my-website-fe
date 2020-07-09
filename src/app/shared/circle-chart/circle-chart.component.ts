import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circle-chart',
  templateUrl: './circle-chart.component.html',
  styleUrls: ['./circle-chart.component.css']
})
export class CircleChartComponent implements OnInit {

  @Input() value: number;
  @Input() size: string;
  @Input() text: string;
  classValue: string;
  classColor: string;

  constructor() { }

  ngOnInit(): void {
    this.classValue = `p${this.value}`;

    if (this.value >= 0 && this.value <= 25) {
      this.classColor = "red";
    } else if (this.value > 25 && this.value <= 75) {
      this.classColor = "blue";
    } else if (this.value > 75 && this.value <= 100) {
      this.classColor = "green";
    } else {
      this.classColor = "dark";
    }
  }

}
