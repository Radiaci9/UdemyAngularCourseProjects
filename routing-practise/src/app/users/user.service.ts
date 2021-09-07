import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users = [
    {
      id: 1,
      name: 'Max'
    },
    {
      id: 2,
      name: 'Anna'
    },
    {
      id: 3,
      name: 'Chris'
    }
  ];
  constructor() { }

  getUsers () {
    return this.users.slice();
  }

  getUserById (id: number) {
    return this.users.find((user) => user.id === id);
  }
}
