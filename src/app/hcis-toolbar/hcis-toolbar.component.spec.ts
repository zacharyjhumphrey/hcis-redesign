import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcisToolbarComponent } from './hcis-toolbar.component';

describe('HcisToolbarComponent', () => {
  let component: HcisToolbarComponent;
  let fixture: ComponentFixture<HcisToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcisToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcisToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
