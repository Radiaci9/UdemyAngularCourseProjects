import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor() { }

  isAuthenticated() {
    return new Promise<boolean>(
      (res) => setTimeout(() => res(this.loggedIn), 800)
    );
  }

  login () {
    this.loggedIn = true;
  }

  logout () {
    this.loggedIn = false;
  }
}
