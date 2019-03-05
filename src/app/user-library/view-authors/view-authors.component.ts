import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../../shared/services/api/api.service';
import {Subscription} from 'rxjs';

export class Author {
  private id: string;
  private firstName: string;
  private middleName: string;
  private lastName: string;

  constructor(data) {
    this.id = data.id;
    this.firstName = data.firstName;
    this.middleName = data.middleName;
    this.lastName = data.lastName;
  }
}

@Component({
  selector: 'app-view-authors',
  templateUrl: './view-authors.component.html',
  styleUrls: ['./view-authors.component.scss']
})
export class ViewAuthorsComponent implements OnInit, OnDestroy {
  $allAuthors: Subscription;
  authors: Author[] = [];
  isLoading = true;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllAuthors();
  }

  ngOnDestroy(): void {
    if (this.$allAuthors != null) {
      this.$allAuthors.unsubscribe();
    }
  }

  getAllAuthors() {
    this.$allAuthors = this.apiService.getAllAuthors().subscribe(
      rsp => {
        rsp.map(author => {
          this.authors.push(new Author(author));
          this.isLoading = false;
        });
      }
    );
  }

}
