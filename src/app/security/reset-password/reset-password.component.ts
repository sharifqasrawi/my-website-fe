import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  faEdit = faEdit;

  loading = false;
  resetted = false

  resetPwdForm: FormGroup;
  email: string = null;
  token: string = null;
  errors: string[] = null;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['LOGIN.RESET_PASSWORD']).subscribe(trans => {
      this.titleService.setTitle(`Q E-Learning - ${trans['LOGIN.RESET_PASSWORD']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['LOGIN.RESET_PASSWORD']).subscribe(trans => {
        this.titleService.setTitle(`Q E-Learning - ${trans['LOGIN.RESET_PASSWORD']}`);
      });
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.email = params.email;
      this.token = params.token;
    });

    if (!this.email || !this.token) {
      this.router.navigate(['/security', 'access-denied']);
    }

    this.resetPwdForm = new FormGroup({
      passwordGroup: new FormGroup({
        password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
      },
        [this.checkPasswords])
    });
  }

  onSubmit() {
    if (!this.resetPwdForm.valid)
      return;

    this.loading = true;
    this.http.post('https://localhost:44383/account/reset-password',
      {
        Email: this.email,
        Password: this.resetPwdForm.value.passwordGroup.password,
        ConfirmPassword: this.resetPwdForm.value.passwordGroup.cpassword,
        Token: this.token.replace(/\s/g, '+')

      },
      {
        headers: new HttpHeaders().append('language', this.translate.currentLang),
        withCredentials: true,
      }).subscribe(() => {
        this.loading = false;
        this.resetted = true;
      }, (errorRes: { error: { errors: string[] } }) => {
        this.errors = errorRes.error.errors;
        this.resetted = false;
        this.loading = false;
      });

  }

  private checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const cpassword = group.get('cpassword').value;

    return password === cpassword ? null : { passwordDoNotMatch: true };
  }


}
