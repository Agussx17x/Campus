import { Component, OnInit } from '@angular/core';
import { Materia } from 'src/app/models/materia';
import { CrudService } from '../../services/crud.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lista-materias',
  templateUrl: './lista-materias.component.html',
  styleUrls: ['./lista-materias.component.css'],
})
export class ListaMateriasComponent implements OnInit {
  // Colección Materias.
  coleccionMateria: Materia[] = [];

  // Materia seleccionado.
  materiaSeleccionado!: Materia;

  // FormGroup.
  materias = new FormGroup({
    titulo: new FormControl('', Validators.required),
    icono: new FormControl('', Validators.required),
  });

  // Representa la página actual del conteo.
  pag: number = 1;

  constructor(public crudService: CrudService) {}

  ngOnInit(): void {
    // Suscribe al observable para obtener datos sobre materias desde el servicio
    this.crudService.obtenerMaterias().subscribe((data) => {
      this.coleccionMateria = data.map((e) => {
        // Mapea los datos recibidos para formatearlos según las propiedades deseadas
        const data = e.payload.doc.data() as {
          titulo: string;
          icono: string;
        };
        // Devuelve un objeto con propiedades seguras
        return {
          idMateria: e.payload.doc.id,
          titulo: data.titulo || '',
          icono: data.icono || '',
          ...(typeof data === 'object' ? data : {}),
        };
      });
    });
  }

  // Esta función llama al modal editar.
  mostrarEditar(materiaSeleccionado: Materia) {
    // Asigna la materia seleccionada a la propiedad materiaSeleccionado del componente
    this.materiaSeleccionado = materiaSeleccionado;
    // Establece los valores en un formulario o algún otro objeto que tiene una propiedad 'setValue'
    this.materias.setValue({
      titulo: materiaSeleccionado.titulo,
      icono: materiaSeleccionado.icono,
    });
  }

  // Esta función edita las materias.
  editarMateria() {
    let datos: Materia = {
      idMateria: this.materiaSeleccionado.idMateria,
      titulo: this.materias.value.titulo!,
      icono: this.materias.value.icono!,
    };

    this.crudService
      .editarMateria(this.materiaSeleccionado.idMateria, datos)
      .then((materia) => {
        alert('La materia se ha editado con éxito.');
      })
      .catch((error) => {
        alert(
          'Ha habido un error al intentar editar la materia, razón: \n' + error
        );
      });
  }

  // Esta función eliminar las materias.
  borrarMateria(materiaSeleccionado: Materia) {
    // Pide confirmación al usuario antes de eliminar la materia
    const confirmacion = confirm(
      '¿Esta seguro que desea eliminar esta materia?: ' +
        materiaSeleccionado.titulo
    );
    // Si el usuario confirma, procede con la eliminación
    if (confirmacion) {
      // Asigna la materia seleccionada a la propiedad materiaSeleccionado del componente
      this.materiaSeleccionado = materiaSeleccionado;
      // Llama al servicio 'crudService' para eliminar la materia utilizando su ID
      this.crudService
        .eliminarMateria(this.materiaSeleccionado.idMateria)
        .then((respuesta) => {
          // Muestra una alerta indicando que la materia se eliminó con éxito
          alert('La materia se ha eliminado con éxito.');
        })
        .catch((error) => {
          // Muestra una alerta si hay un error al intentar eliminar la materia
          alert(
            'Hubo un error al intentar eliminar una materia, razón: \n' + error
          );
        });
    }
  }
}
