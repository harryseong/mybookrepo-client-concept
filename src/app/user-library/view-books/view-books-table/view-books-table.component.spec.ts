import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBooksTableComponent } from './view-books-table.component';

describe('ViewBooksTableComponent', () => {
  let component: ViewBooksTableComponent;
  let fixture: ComponentFixture<ViewBooksTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBooksTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBooksTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
