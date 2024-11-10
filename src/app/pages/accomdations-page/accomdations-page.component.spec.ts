import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomdationsPageComponent } from './accomdations-page.component';

describe('AccomdationsPageComponent', () => {
  let component: AccomdationsPageComponent;
  let fixture: ComponentFixture<AccomdationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccomdationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccomdationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
