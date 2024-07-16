import { Injectable } from '@angular/core';


export interface Workout {
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  constructor() {
    this.loadInitialData();
  }

  // Load initial data with 3 users or from localStorage if available
  private loadInitialData(): void {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    } else {
      this.users = [
        {
          id: 1,
          name: 'John Doe',
          workouts: [
            { type: 'Running', minutes: 30 },
            { type: 'Cycling', minutes: 45 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          workouts: [
            { type: 'Swimming', minutes: 60 },
            { type: 'Running', minutes: 20 }
          ]
        },
        {
          id: 3,
          name: 'Mike Johnson',
          workouts: [
            { type: 'Yoga', minutes: 50 },
            { type: 'Cycling', minutes: 40 }
          ]
        }
      ];
      this.saveUsersToLocalStorage();
    }
  }

  // Save users to localStorage
  private saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }

  // Get all users
  getUsers(): User[] {
    return this.users;
  }

  // Add a new user
  addUser(user: User): void {
    user.id = this.users.length + 1;
    this.users.push(user);
    this.saveUsersToLocalStorage();
  }

   // Update a user
   updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveUsersToLocalStorage();
    } else {
      throw new Error('User not found'); // Basic error handling
    }
  }

  // Delete a user
  deleteUser(id: number): void {
    this.users = this.users.filter(user => user.id !== id);
    this.saveUsersToLocalStorage();
  }

  // Filter users by name
  filterUsersByName(name: string): User[] {
    return this.users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }

  // Filter users by workout type
  filterUsersByWorkoutType(type: string): User[] {
    return this.users.filter(user => user.workouts.some(workout => workout.type.toLowerCase() === type.toLowerCase()));
  }
}
