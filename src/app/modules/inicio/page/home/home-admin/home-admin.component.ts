import { Component } from '@angular/core';
import { Trabajos } from 'src/app/models/trabajos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from 'src/app/modules/inicio/page/home/services/crud.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { Router } from '@angular/router';
import { Avisos } from 'src/app/models/avisos';
import { AvisosService } from '../services/avisos.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css'],
})
export class HomeAdminComponent {
  // Colecciones
  coleccionTrabajos: Trabajos[] = [];
  coleccionAvisos: Avisos[] = [];

  // FormGroups
  trabajo = new FormGroup({
    titulo: new FormControl('', Validators.required),
    docs: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
  });

  avisos = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  });

  constructor(
    private crudService: CrudService,
    private avisosService: AvisosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Luego, obtén la lista de avisos al inicializar el componente
    this.avisosService.obtenerAvisos().subscribe((avisos) => {
      this.coleccionAvisos = avisos;
    });
  }

  selectDay!: string;

  async agregarAviso() {
    if (this.avisos.valid) {
      let nuevoAviso: Avisos = {
        idAvisos: '',
        titulo: this.avisos.value.titulo!,
        descripcion: this.avisos.value.descripcion!,
      };

      //ENVIAMOS ESE PRODUCTO
      await this.avisosService
        .crearAvisos(nuevoAviso)
        .then((avisos) => {
          alert('Ha agregado un nuevo aviso con éxito');
        })
        .catch((error) => {
          alert('Hubo un error al intentar cargar el nuevo aviso \n' + error);
        });
    }
  }
}
