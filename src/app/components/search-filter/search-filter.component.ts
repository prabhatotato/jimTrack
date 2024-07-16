import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html'
})
export class SearchFilterComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();
  @Output() addNew = new EventEmitter<void>();
  @Output() filter = new EventEmitter<void>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onAddNew() {
    this.addNew.emit();
  }

  onFilter() {
    this.filter.emit();
  }
}
