import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxUtilsComponent } from './ngx-utils.component';

describe('NgxUtilsComponent', () => {
  let component: NgxUtilsComponent;
  let fixture: ComponentFixture<NgxUtilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxUtilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxUtilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
