import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupBooksComponent } from './lookup-books.component';

describe('LookupBooksComponent', () => {
  let component: LookupBooksComponent;
  let fixture: ComponentFixture<LookupBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookupBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookupBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
