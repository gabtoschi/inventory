import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collection-pager',
  templateUrl: './collection-pager.component.html',
  styleUrls: ['./collection-pager.component.scss']
})
export class CollectionPagerComponent implements OnInit {

  currentPage: number = 1;
  pages: number[];

  @Input() maxPages;
  @Input() perPage;
  @Input() listLength;
  @Output() pageChanged = new EventEmitter<number>();

  getTotalPages(){
    return Math.ceil(this.listLength / this.perPage);
  }

  pageClicked(page: number){
    this.currentPage = page;
    this.pageChanged.emit(this.currentPage);
    this.generatePages();
  }

  nextPage(){
    if (this.currentPage < this.getTotalPages())
      this.pageClicked(this.currentPage + 1);
  }

  previousPage(){
    if (this.currentPage > 1)
      this.pageClicked(this.currentPage - 1);
  }

  generatePages(){
    let pageArray: number[] = [];
    let totalPages: number = this.getTotalPages();
    let offset: number = Math.ceil((this.maxPages - 1) / 2);

    let firstPageShown: number;
    let pageQuantity: number;

    if (totalPages < this.maxPages){ // pagination not full
      firstPageShown = 1;
      pageQuantity = totalPages;
    } else {
      pageQuantity = this.maxPages;

      if (this.currentPage <= offset) // first pages
        firstPageShown = 1;
      else if (this.currentPage > (totalPages - offset)) // last pages
        firstPageShown = totalPages - this.maxPages + 1; // default scenario
      else firstPageShown = this.currentPage - offset;
    }

    for (let i = firstPageShown; i < (firstPageShown + pageQuantity); i++)
      pageArray.push(i);

    this.pages = pageArray;    
  }

  constructor() { }

  ngOnInit() {
    this.generatePages();
  }

}
