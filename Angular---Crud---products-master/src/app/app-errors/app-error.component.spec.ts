import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppErrorComponent } from './app-error.component';

describe('AppErrorComponent', () => {
  let component: AppErrorComponent;
  let fixture: ComponentFixture<AppErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppErrorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
