import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: User | null = null;

  constructor(private auth: AngularFireAuth, private router: Router) {}

  public async login() {
    const credentials = await this.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
    this.user = {
      email: credentials.user?.email ?? '',
      displayName: credentials.user?.displayName ?? '',
    };
    this.router.navigate(['/owner']);
  }

  public async logout() {
    await this.auth.signOut();
    this.router.navigate(['/']);
  }
}
