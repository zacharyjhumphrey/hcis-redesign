import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThesisSearchComponent } from './thesis-search.component';

describe('ThesisSearchComponent', () => {
  let component: ThesisSearchComponent;
  let fixture: ComponentFixture<ThesisSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThesisSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThesisSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
