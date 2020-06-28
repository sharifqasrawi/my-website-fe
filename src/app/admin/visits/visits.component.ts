import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { Store } from '@ngrx/store';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { faSearch, faEye } from '@fortawesome/free-solid-svg-icons';

import * as fromApp from '../../store/app.reducer';
import * as VisitsActions from './store/visits.actions';
import { Visit } from './../../models/visit.model';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

  faSearch = faSearch;
  faEye = faEye;

  visits: Visit[] = null;
  loading = false;
  errors: string[] = null;

  displayedColumns: string[] = ['id', 'ipAddress', 'continent_Name', 'country_Name', 'city', 'dateTime', 'dayVisitsCount', 'actions'];
  dataSource: MatTableDataSource<Visit>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  constructor(
    private store: Store<fromApp.AppState>,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new VisitsActions.FetchVisitsAdminStart());

    this.store.select('visits').subscribe(state => {
      this.visits = state.visits;
      this.loading = state.loadingVisitsAdmin;
      this.errors = state.errorsVisits;

      this.setTable();
    });
  }

  onRefresh() {
    this.store.dispatch(new VisitsActions.FetchVisitsAdminStart());
    this.setTable();
  }

  onViewDetails(id: number) {
    const visit = this.visits.find(v => v.id === id);

    this.bottomSheet.open(VisitDetailsComponent, {
      data: { visit: visit }
    });
  }

  private setTable() {

    this.dataSource = new MatTableDataSource(this.visits);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
