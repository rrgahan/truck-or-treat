import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsertTruckComponent } from './upsert-truck.component';

describe('UpsertTruckComponent', () => {
  let component: UpsertTruckComponent;
  let fixture: ComponentFixture<UpsertTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpsertTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpsertTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
