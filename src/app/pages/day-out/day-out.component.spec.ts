import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayOutComponent } from './day-out.component';

describe('DayOutComponent', () => {
  let component: DayOutComponent;
  let fixture: ComponentFixture<DayOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
