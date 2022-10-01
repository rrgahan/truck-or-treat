import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Truck } from 'src/app/models/truck';

@Component({
  selector: 'app-upsert-truck',
  templateUrl: './upsert-truck.component.html',
  styleUrls: ['./upsert-truck.component.scss'],
})
export class UpsertTruckComponent implements OnInit {
  @Input() truckToUpdate!: Truck;
  @Output() savedTruck: EventEmitter<any> = new EventEmitter();

  public truckFormGroup: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl(''),
  });

  constructor(private store: AngularFirestore) {}

  public ngOnInit(): void {
    if (this.truckToUpdate) {
      this.truckFormGroup.patchValue(this.truckToUpdate);
    }
  }

  public async save() {
    let reference;
    if (this.truckToUpdate) {
      await this.store
        .collection('truck')
        .doc(this.truckToUpdate.id)
        .update(this.truckFormGroup.value);
    } else {
      reference = await this.store
        .collection('truck')
        .add(this.truckFormGroup.value);
    }
    this.savedTruck.emit(reference);
  }
}
