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
    this.users = this.userService.getUsers();
  }

  selectUser(user: User) {
    this.userSelected.emit(user);
  }

  deleteUser(id: number, event: Event) {
    event.stopPropagation();
    this.userService.deleteUser(id);
    this.users = this.userService.getUsers();
  }

  editUser(user: User, event: Event) {
    event.stopPropagation();
    // Logic for editing the user
  }

  changePage(event: any) {
    // Logic for handling pagination
  }
}
