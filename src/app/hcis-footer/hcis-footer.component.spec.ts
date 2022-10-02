import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcisFooterComponent } from './hcis-footer.component';

describe('HcisFooterComponent', () => {
  let component: HcisFooterComponent;
  let fixture: ComponentFixture<HcisFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcisFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcisFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
