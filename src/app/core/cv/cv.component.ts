import { MediaMatcher } from '@angular/cdk/layout';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {

  @ViewChild('navPanel') navPanel;

  mobileQuery: MediaQueryList;
  expanded = true;

  breadcrumbLinks: { url?: string, translate?: boolean, label: string }[];

  constructor(private translate: TranslateService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 990px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;

  ngOnInit(): void {

    this.breadcrumbLinks = [
      { url: '/', label: 'Home', translate: true },
      { label: 'CV', translate: true },
    ];
  }

  onSelectNav() {
    if (this.mobileQuery.matches)
      this.navPanel.toggle()
  }
}
