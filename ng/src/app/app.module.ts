import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';

import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
import { ChipModule } from 'primeng/chip';

import { ReactiveFormsModule } from '@angular/forms';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DividerModule } from 'primeng/divider';
import { TruckCardComponent } from './components/truck-card/truck-card.component';
import { environment } from 'src/environments/environment';
import { OwnerComponent } from './pages/owner/owner.component';
import { LoginComponent } from './pages/login/login.component';
import { UpsertTruckComponent } from './components/upsert-truck/upsert-truck.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TruckCardComponent,
    OwnerComponent,
    LoginComponent,
    UpsertTruckComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    ChipModule,
    ChipsModule,
    DialogModule,
    DividerModule,
    InputSwitchModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
