import { Component, OnInit, Inject } from '@angular/core';

import { Visit } from './../../../models/visit.model';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

export interface DialogData {
  visit: Visit
}

@Component({
  selector: 'app-visit-details',
  templateUrl: './visit-details.component.html',
  styleUrls: ['./visit-details.component.css']
})
export class VisitDetailsComponent implements OnInit {

  constructor(
    private bottomSheetRef: MatBottomSheetRef<VisitDetailsComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

}
