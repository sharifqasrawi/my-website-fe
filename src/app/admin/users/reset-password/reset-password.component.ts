import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import * as UsersActions from '../store/users.actions';

interface DialogData {
  id: string
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  faUserEdit = faUserEdit;

  form: FormGroup;
  @ViewChild('f') f: FormGroupDirective;
  resetting = false;
  resetted = false;
  errors: string[] = null;

  currentLang: string = null;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordComponent>,
    private store: Store<fromApp.AppState>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required])
    });

    this.store.select('users').subscribe(state => {
      this.resetting = state.resetting;
      this.errors = state.errors;

      if (state.resetted)
        this.dialogRef.close();
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (!this.form.valid) return;

    this.store.dispatch(new UsersActions.ChangePasswordStart({
      userId: this.data.id,
      password: this.form.value.password
    }));

  }

  ngOnDestroy() {
    this.store.dispatch(new UsersActions.ClearStatus());
    this.store.dispatch(new UsersActions.ClearErrors());
  }
}
