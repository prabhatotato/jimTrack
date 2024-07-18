import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { PageEvent } from '@angular/material/paginator';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';



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
  @Output() userEdited = new EventEmitter<User>();
  selectedUser: User | null = null;

  

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {}

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

  editUser(user: User, event: Event): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        console.log('from user-table emitting', result);
        
        this.userEdited.emit(result);
      }
    });
  }

  refreshUsers(): void {
    this.users = this.userService.getUsers();
    this.updatePaginatedUsers();
    console.log('table refreshed:', this.users);
    if (this.selectedUser) {
      const user = this.users.find(user => user.id === this.selectedUser!.id) || undefined;
      this.isSelected(user!)
      this.userSelected.emit(user);
    }

    
    
    
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
