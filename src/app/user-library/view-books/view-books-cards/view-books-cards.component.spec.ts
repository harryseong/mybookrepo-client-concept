import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBooksCardsComponent } from './view-books-cards.component';

describe('ViewBooksCardsComponent', () => {
  let component: ViewBooksCardsComponent;
  let fixture: ComponentFixture<ViewBooksCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBooksCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBooksCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
