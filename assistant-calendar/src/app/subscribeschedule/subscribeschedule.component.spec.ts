import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribescheduleComponent } from './subscribeschedule.component';

describe('SubscribescheduleComponent', () => {
  let component: SubscribescheduleComponent;
  let fixture: ComponentFixture<SubscribescheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribescheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscribescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
