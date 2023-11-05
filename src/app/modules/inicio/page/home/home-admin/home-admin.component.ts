import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'src/app/modules/admin/services/crud.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent {
  coleccionTrabajos: Trabajos[] = [];

  trabajo = new FormGroup({
    //Docs
    titulo: new FormControl('', Validators.required),
    docs: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
  });

  constructor(public servicioCrud: CrudService, private router: Router) {}

  ngOnInit(): void {
    
  }

  selectDay!: string;

  openModal(day: string) {
    this.selectDay = day;
  }
}
