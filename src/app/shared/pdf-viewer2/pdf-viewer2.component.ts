import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  filePath: string,
}

@Component({
  selector: 'app-pdf-viewer2',
  templateUrl: './pdf-viewer2.component.html',
  styleUrls: ['./pdf-viewer2.component.css']
})
export class PdfViewer2Component implements OnInit {


  currentLang: string;

  constructor(
    public dialogRef: MatDialogRef<PdfViewer2Component>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private translate: TranslateService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
  }



}
