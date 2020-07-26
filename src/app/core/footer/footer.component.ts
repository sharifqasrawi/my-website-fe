import { PrivacyPolicyComponent } from './../privacy-policy/privacy-policy.component';
import { MatDialog } from '@angular/material/dialog';
import { faCheckCircle, faLink, faAt } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faCheckCircle = faCheckCircle;
  faLink = faLink;
  faAt = faAt;

  currentYear: number;

  constructor(public translate: TranslateService, private dialog: MatDialog) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');

    if (!localStorage.getItem('lang')) {
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    } else {
      translate.use(localStorage.getItem('lang'));
    }
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }


  onOpenPrivacyPolicy() {
    const dialogRef = this.dialog.open(PrivacyPolicyComponent, {
      width: '650px',
      disableClose: true
    });
  }

  onChangeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}
