import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomImageEvent } from 'angular-x-image-viewer';

export interface DialogData {
  images: string[],
  index?: number
}


@Component({
  selector: 'app-imgs-viewer',
  templateUrl: './imgs-viewer.component.html',
  styleUrls: ['./imgs-viewer.component.css']
})
export class ImgsViewerComponent implements OnInit {

  faPlus = faPlus;
  config = {
    btnClass: 'default', // The CSS class(es) that will apply to the buttons
    zoomFactor: 0.1, // The amount that the scale will be increased by
    containerBackgroundColor: 'transparent', // The color to use for the background. This can provided in hex, or rgb(a).
    wheelZoom: true, // If true, the mouse wheel can be used to zoom in
    allowFullscreen: true, // If true, the fullscreen button will be shown, allowing the user to enter fullscreen mode
    allowKeyboardNavigation: true, // If true, the left / right arrow keys can be used for navigation
    btnIcons: { // The icon classes that will apply to the buttons. By default, font-awesome is used.
      zoomIn: 'fa fa-plus',
      zoomOut: 'fa fa-minus',
      rotateClockwise: 'fa fa-repeat',
      rotateCounterClockwise: 'fa fa-undo',
      next: 'fa fa-arrow-right',
      prev: 'fa fa-arrow-left',
      fullscreen: 'fa fa-arrows-alt',
    },
    btnShow: {
      zoomIn: true,
      zoomOut: true,
      rotateClockwise: true,
      rotateCounterClockwise: true,
      next: true,
      prev: true
    },
    customBtns: [{ name: 'close', icon: 'fa fa-times' }]
  };

  constructor(
    public dialogRef: MatDialogRef<ImgsViewerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {

  }

  handleEvent(event: CustomImageEvent) {

    switch (event.name) {
      case 'close':
        this.dialogRef.close();
        break;
    }
  }

}
