import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajosComponent } from './trabajos.component';

describe('TrabajosComponent', () => {
  let component: TrabajosComponent;
  let fixture: ComponentFixture<TrabajosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrabajosComponent]
    });
    fixture = TestBed.createComponent(TrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
