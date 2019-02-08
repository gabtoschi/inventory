import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collection-pager',
  templateUrl: './collection-pager.component.html',
  styleUrls: ['./collection-pager.component.scss']
})
export class CollectionPagerComponent implements OnInit {

  public currentPage = 1;
  public pages: number[];

  @Input() public maxPages: number;
  @Input() public perPage: number;
  @Input() public listLength: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  public ngOnInit() {
    this.generatePages();
  }

  private getTotalPages() {
    return Math.ceil(this.listLength / this.perPage);
  }

  private pageClicked(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
    this.generatePages();
  }

  private nextPage() {
    if (this.currentPage < this.getTotalPages()) {
      this.pageClicked(this.currentPage + 1);
    }
  }

  private previousPage() {
    if (this.currentPage > 1) {
      this.pageClicked(this.currentPage - 1);
    }
  }

  private generatePages() {
    const pageArray: number[] = [];
    const totalPages: number = this.getTotalPages();
    const offset: number = Math.ceil((this.maxPages - 1) / 2);

    let firstPageShown: number;
    let pageQuantity: number;

    if (totalPages < this.maxPages) { // pagination not full
      firstPageShown = 1;
      pageQuantity = totalPages;
    } else {
      pageQuantity = this.maxPages;

      if (this.currentPage <= offset) { // first pages
        firstPageShown = 1;
      } else if (this.currentPage > (totalPages - offset)) { // last pages
        firstPageShown = totalPages - this.maxPages + 1;
      } else {
        firstPageShown = this.currentPage - offset; // default scenario
      }
    }

    for (let i = firstPageShown; i < (firstPageShown + pageQuantity); i++) {
      pageArray.push(i);
    }

    this.pages = pageArray;
  }
}
