import {  faHome } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Input } from '@angular/core';

export interface Link {
  url?: string,
  translate?: boolean,
  label: string,
}

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {

  faHome = faHome;

  @Input() links: Link[];

  
  constructor() { }

  ngOnInit(): void {
  }

}
