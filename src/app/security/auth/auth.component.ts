import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  faUser = faUser;

  form: FormGroup;
  hidePwd = true;
  loading = false;
  errors: string[] = null;

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(state => {
      this.loading = state.loading;
      this.errors = state.errors;
    });

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (!this.form.valid)
      return;

    this.store.dispatch(new AuthActions.LoginStart({
      email: this.form.value.username,
      password: this.form.value.password
    }
    ));
  }

  ngOnDestroy() {
    this.loading = false;
    this.errors = null;

    this.store.dispatch(new AuthActions.ClearErrors());

  }
}
