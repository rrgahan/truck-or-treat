import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private store: AngularFirestore) {}
  public trucks: any[] = [];

  ngOnInit(): void {
    this.store
      .collection('truck')
      .valueChanges()
      .pipe(
        tap((trucks) => (this.trucks = trucks.filter((f: any) => f.isLive)))
      )
      .subscribe();
  }
}
