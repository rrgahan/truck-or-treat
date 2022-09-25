import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { filter, forkJoin, from, mergeAll, tap } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.scss'],
})
export class OwnerComponent implements OnInit {
  public isOwner = false;
  public trucks: any[] = [];

  private owner: any;
  constructor(
    private store: AngularFirestore,
    private authService: AuthService
  ) {}

  public async logout() {
    await this.authService.logout();
  }

  ngOnInit(): void {
    const ownerEmail = this.authService.user?.email ?? 'test@example.com';
    this.loadTrucksForOwner(ownerEmail);
  }

  private loadTrucksForOwner(ownerEmail: string) {
    this.store
      .collection('owners', (ref) => ref.where('email', '==', ownerEmail))
      .valueChanges()
      .pipe(
        filter((owners) => {
          this.isOwner = !!owners.length;
          return this.isOwner;
        }),
        tap(async (owners) => {
          this.owner = owners[0];
          const trucks = [];
          for (let truck of this.owner.trucks) {
            const truckData = (await truck.get()).data();
            trucks.push({ ...truckData, id: truck.id });
          }
          this.trucks = trucks;
        })
      )
      .subscribe();
  }
}
