import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { Truck } from 'src/app/models/truck';

@Component({
  selector: 'app-truck-card',
  templateUrl: './truck-card.component.html',
  styleUrls: ['./truck-card.component.scss'],
})
export class TruckCardComponent implements OnDestroy, OnInit {
  @Input() public editable = false;
  @Input() public truck!: Truck;
  public shouldShowUpsertTruckDialog: boolean = false;

  public shouldShowAddressDialog = false;
  public truckFormGroup: FormGroup = new FormGroup({
    isLive: new FormControl(false),
    liveAddress: new FormControl(''),
  });

  private destroy$: Subject<boolean> = new Subject();

  constructor(private store: AngularFirestore) {}

  public editTruck() {
    this.shouldShowUpsertTruckDialog = true;
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  public ngOnInit(): void {
    this.truckFormGroup.patchValue({ ...this.truck });

    this.truckFormGroup.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((valueChanges) => {
          if (valueChanges.isLive) {
            this.shouldShowAddressDialog = true;
          } else {
            this.save();
          }
        })
      )
      .subscribe();
  }

  public async refreshData() {
    this.store
      .collection('truck')
      .doc(this.truck.id)
      .get()
      .pipe(tap((t) => (this.truck = t.data() as Truck)))
      .subscribe();

    this.shouldShowUpsertTruckDialog = false;
  }

  public async save() {
    await this.store
      .collection('truck')
      .doc(this.truck.id)
      .update(this.truckFormGroup.value);
    this.truck.isLive = this.truckFormGroup.value.isLive;
    this.truck.liveAddress = this.truckFormGroup.value.liveAddress;
    this.shouldShowAddressDialog = false;
  }
}
