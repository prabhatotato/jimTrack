import { Component, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { UserTableComponent } from './components/user-table/user-table.component';
import { User } from './services/user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'workout-challenge-tracker';

  @ViewChild(UserTableComponent) userTable!: UserTableComponent;
  selectedUser: User | null = null;

  constructor(private userService: UserService) {}

  onUserSelected(user: User): void {
    this.selectedUser = user;
  }

  onUserAdded(newUser: User): void {
    console.log('app component recieved new user:', newUser);
    
    this.userService.addUser(newUser);
    this.userTable.refreshUsers();
  }

  onSearch(searchTerm: string): void {
    this.userTable.filterUsersByName(searchTerm);
  }

  onFilter(filterTerm: string): void {
    this.userTable.filterUsersByWorkoutType(filterTerm);
  }
}
