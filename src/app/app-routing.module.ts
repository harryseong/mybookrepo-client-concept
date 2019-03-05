import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {UserLibraryComponent} from './user-library/user-library.component';
import {AddBookComponent} from './user-library/view-books/add-book/add-book.component';
import {ViewBooksComponent} from './user-library/view-books/view-books.component';
import {DashboardComponent} from './user-library/dashboard/dashboard.component';
import {ViewAuthorsComponent} from './user-library/view-authors/view-authors.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'library', component: UserLibraryComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'authors', component: ViewAuthorsComponent},
      {path: 'books', component: ViewBooksComponent},
      {path: 'books/lookup', component: AddBookComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
