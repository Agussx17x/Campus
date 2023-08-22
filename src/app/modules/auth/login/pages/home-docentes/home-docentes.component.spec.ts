import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDocentesComponent } from './home-docentes.component';

describe('HomeDocentesComponent', () => {
  let component: HomeDocentesComponent;
  let fixture: ComponentFixture<HomeDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeDocentesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
