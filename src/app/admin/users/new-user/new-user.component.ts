import { ConfirmDialogComponent } from './../../../shared/confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';
import { faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ThemePalette } from '@angular/material/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

import * as fromApp from '../../../store/app.reducer';
import * as UsersActions from '../store/users.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  editMode = false;

  faUserPlus = faUserPlus;
  faUserEdit = faUserEdit;

  colorPrimary: ThemePalette = 'primary';
  colorAccent: ThemePalette = 'accent';
  colorWarn: ThemePalette = 'warn';
  checked = false;

  regForm: FormGroup;
  errors: string[] = null;
  loading = false;
  creating = false;
  created = false;
  updating = false;
  updated = false;
  userId: string = null;
  hidePwd = true;
  hideCpwd = true;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private dialog: MatDialog,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.translate.get(['ADMINISTRATION.USERS.LIST_USERS']).subscribe(trans => {
      this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.USERS.LIST_USERS']}`);
    });
    this.translate.onLangChange.subscribe(() => {
      this.translate.get(['ADMINISTRATION.USERS.LIST_USERS']).subscribe(trans => {
        this.titleService.setTitle(`Admin - ${trans['ADMINISTRATION.USERS.LIST_USERS']}`);
      });
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.userId = params.userId;
      this.editMode = params.editMode;
    });

    this.store.select('users')
      .subscribe(usersState => {
        this.loading = usersState.loading;
        this.errors = usersState.errors;
        this.creating = usersState.creating;
        this.created = usersState.created;
        this.updating = usersState.updating;
        this.updated = usersState.updated;

        if (this.created) {
          this.regForm.reset();

          this.router.navigate(['/admin', 'users']);
        }
      });

    if (this.editMode) {

      this.store.select('users').pipe(
        map(usersState => usersState.users.find(u => u.id === this.userId))
      )
        .subscribe(user => {
          this.regForm = new FormGroup({
            isAdmin: new FormControl(user.isAdmin),
            firstName: new FormControl(user.firstName, [Validators.required]),
            lastName: new FormControl(user.lastName, [Validators.required]),
            email: new FormControl(user.email, [Validators.required, Validators.email]),
            emailConfirmed: new FormControl(user.emailConfirmed),
          });
        })


    } else {
      this.regForm = new FormGroup({
        isAdmin: new FormControl(null),
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        emailConfirmed: new FormControl(null),
        password: new FormGroup({
          password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
          cpassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
        },
          [this.checkPasswords])
      });

    }

  }


  onSubmit() {
    if (!this.regForm.valid)
      return;

    if (!this.editMode) {
      this.store.dispatch(new UsersActions.CreateStart({
        email: this.regForm.value.email,
        password: this.regForm.value.password.password,
        confirmPassword: this.regForm.value.password.cpassword,
        firstName: this.regForm.value.firstName,
        lastName: this.regForm.value.lastName,
        isAdmin: this.regForm.value.isAdmin ?? false,
        emailConfirmed: this.regForm.value.emailConfirmed ?? false
      }));

    }
    else {
      this.store.dispatch(new UsersActions.UpdateStart({
        userId: this.userId,
        email: this.regForm.value.email,
        firstName: this.regForm.value.firstName,
        lastName: this.regForm.value.lastName,
        isAdmin: this.regForm.value.isAdmin ?? false,
        emailConfirmed: this.regForm.value.emailConfirmed ?? false
      }));


    }
  }

  onCancel() {
    let alertHeader = '';
    let alertMsg = '';

    this.translate.get(['COMMON.CONFIRM_CANCEL', 'COMMON.CANCEL_MESSAGE']).subscribe(trans => {
      alertHeader = trans['COMMON.CONFIRM_CANCEL'];
      alertMsg = trans['COMMON.CANCEL_MESSAGE'];
    });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { header: alertHeader, message: alertMsg }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result)
        this.router.navigate(['/admin', 'users']);
    });

  }

  ngOnDestroy() {

    this.store.dispatch(new UsersActions.ClearErrors());
    this.store.dispatch(new UsersActions.ClearStatus());
  }



  private checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const cpassword = group.get('cpassword').value;

    return password === cpassword ? null : { passwordDoNotMatch: true };
  }
}
