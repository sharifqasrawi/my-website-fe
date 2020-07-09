import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-header',
  templateUrl: './text-header.component.html',
  styleUrls: ['./text-header.component.css']
})
export class TextHeaderComponent implements OnInit {

  @Input('text') text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
