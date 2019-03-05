import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MaterialModule} from '../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import {WelcomeComponent} from './home/welcome/welcome.component';
import {ApiService} from '../shared/services/api/api.service';
import { BookDetailsDialogComponent } from '../shared/dialogs/book-details-dialog/book-details-dialog.component';
import {DialogService} from '../shared/services/dialog/dialog.service';
import { UserLibraryComponent } from './user-library/user-library.component';
import { AddBookComponent } from './user-library/view-books/add-book/add-book.component';
import { ViewBooksComponent } from './user-library/view-books/view-books.component';
import { DashboardComponent } from './user-library/dashboard/dashboard.component';
import { ViewAuthorsComponent } from './user-library/view-authors/view-authors.component';
import { ViewBooksTableComponent } from './user-library/view-books/view-books-table/view-books-table.component';
import { ViewBooksCardsComponent } from './user-library/view-books/view-books-cards/view-books-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    WelcomeComponent,
    BookDetailsDialogComponent,
    UserLibraryComponent,
    AddBookComponent,
    ViewBooksComponent,
    DashboardComponent,
    ViewAuthorsComponent,
    ViewBooksTableComponent,
    ViewBooksCardsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule
  ],
  entryComponents: [
    BookDetailsDialogComponent,
  ],
  providers: [
    ApiService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
