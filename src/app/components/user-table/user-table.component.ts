import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html'
})
export class UserTableComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];
  pageSize: number = 5;
  pageIndex: number = 0;
  

  @Output() userSelected = new EventEmitter<User>();
  selectedUser: User | null = null;


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.refreshUsers();
  }

  selectUser(user: User) {
    this.selectedUser = user
    this.userSelected.emit(user);
  }

  isSelected(user: User): boolean {
    return this.selectedUser === user;
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
    this.updatePaginatedUsers();
    console.log('table refreshed:', this.users);
    
  }

  filterUsersByName(searchTerm: string): void {
    this.users = this.userService.filterUsersByName(searchTerm);
    this.pageIndex = 0;
    this.updatePaginatedUsers();
  }

  filterUsersByWorkoutType(type: string): void {
    this.users = this.userService.filterUsersByWorkoutType(type);
    this.updatePaginatedUsers();
    console.log('on filtering all users are:', this.users);

    console.log('on filtering paginated users are:', this.paginatedUsers);
    
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedUsers();
  }

  updatePaginatedUsers(): void {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    console.log('slicing ', start, 'to', end);
    
    this.paginatedUsers = this.users.slice(start, end);
  }




}
