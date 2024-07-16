// user-table.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) {
    this.dataSource = new MatTableDataSource(this.userService.getUsers());
    console.log('here is data source:',this.dataSource);
    
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  logUserName(user: User): void {
    console.log('Clicked user:', user.name);
  }
}
