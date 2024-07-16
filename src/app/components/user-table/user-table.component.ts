import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  

  @Output() userSelected = new EventEmitter<User>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.refreshUsers();
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
  }

  deleteUser(id: string, event: Event) {
    event.stopPropagation();
    this.userService.deleteUser(id);
    this.refreshUsers();
  }

  editUser(user: User, event: Event) {
    event.stopPropagation();
    // Logic for editing the user
  }

  refreshUsers(): void {
    this.users = this.userService.getUsers();
    console.log('table refreshed:', this.users);
    
  }

  filterUsersByName(searchTerm: string): void {
    this.users = this.userService.filterUsersByName(searchTerm);
  }

  filterUsersByWorkoutType(type: string): void {
    this.users = this.userService.filterUsersByWorkoutType(type);
  }

  changePage(event: any) {
    // Logic for handling pagination
  }
}
