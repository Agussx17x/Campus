import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAlumnoComponent } from './home-alumno.component';

describe('HomeAlumnoComponent', () => {
  let component: HomeAlumnoComponent;
  let fixture: ComponentFixture<HomeAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAlumnoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
