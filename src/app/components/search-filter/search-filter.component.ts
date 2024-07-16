import { Component, Output, EventEmitter, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../services/user.service';


@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent {
  searchTerm: string = '';
  filterTerm: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() userAdded = new EventEmitter<User>();
  @Output() filter = new EventEmitter<string>();

  @ViewChild('addUserDialog') addUserDialog!: TemplateRef<any>;

  constructor(public dialog: MatDialog) {}


  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onAddNew() {
    this.dialog.open(this.addUserDialog);
  }

  onUserAdded(newUser: User): void {
    console.log('emitting user from search filter :', newUser);
    
    this.userAdded.emit(newUser);
    this.dialog.closeAll();
  }

  onFilter() {
    this.filter.emit(this.filterTerm);
  }
}
