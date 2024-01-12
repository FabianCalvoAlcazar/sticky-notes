import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStickyNotesComponent } from './my-sticky-notes.component';

describe('MyStickyNotesComponent', () => {
  let component: MyStickyNotesComponent;
  let fixture: ComponentFixture<MyStickyNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyStickyNotesComponent]
    });
    fixture = TestBed.createComponent(MyStickyNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
