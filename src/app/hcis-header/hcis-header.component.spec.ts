import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcisHeaderComponent } from './hcis-header.component';

describe('HcisHeaderComponent', () => {
  let component: HcisHeaderComponent;
  let fixture: ComponentFixture<HcisHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcisHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcisHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
