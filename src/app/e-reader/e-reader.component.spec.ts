import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EReaderComponent } from './e-reader.component';

describe('EReaderComponent', () => {
  let component: EReaderComponent;
  let fixture: ComponentFixture<EReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EReaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
