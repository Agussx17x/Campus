import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDocenteComponent } from './home-docente.component';

describe('HomeDocenteComponent', () => {
  let component: HomeDocenteComponent;
  let fixture: ComponentFixture<HomeDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
