import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnDestroy, OnInit {
  public queryFormGroup = new FormGroup({
    searchText: new FormControl(''),
  });

  public trucksToDisplay: any[] = [];

  private destroy$: Subject<boolean> = new Subject();
  private trucks: any[] = [];

  constructor(private store: AngularFirestore) {}

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.store
      .collection('truck', (ref) => ref.where('isLive', '==', true))
      .valueChanges()
      .pipe(
        takeUntil(this.destroy$),
        tap((trucks) => {
          this.trucks = trucks;
          this.trucksToDisplay = trucks;
        })
      )
      .subscribe();

    this.queryFormGroup.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        filter((valueChanges) => !!valueChanges.searchText),
        tap(
          (valueChanges) =>
            (this.trucksToDisplay = this.trucks.filter((f) => {
              return f.name
                .toLowerCase()
                .includes(valueChanges.searchText?.toLowerCase());
            }))
        )
      )
      .subscribe();
  }
}
