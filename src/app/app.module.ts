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
import { ViewBooksComponent } from './user-library/view-books/view-books.component';
import { DashboardComponent } from './user-library/dashboard/dashboard.component';
import { ViewAuthorsComponent } from './user-library/view-authors/view-authors.component';
import { ViewBooksTableComponent } from './user-library/view-books/view-books-table/view-books-table.component';
import { ViewBooksCardsComponent } from './user-library/view-books/view-books-cards/view-books-cards.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {LookupBooksComponent} from './user-library/view-books/lookup-books/lookup-books.component';
import { ProgressSpinnerComponent } from '../shared/progress-spinner/progress-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    WelcomeComponent,
    BookDetailsDialogComponent,
    UserLibraryComponent,
    ViewBooksComponent,
    DashboardComponent,
    ViewAuthorsComponent,
    ViewBooksTableComponent,
    ViewBooksCardsComponent,
    LookupBooksComponent,
    ProgressSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
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
