import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEstudianteComponent } from './home-estudiante/home-estudiante.component';
import { HomeDocenteComponent } from './home-docente/home-docente.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { MateriaComponent } from './components/materia/materia.component';
import { AuthGuard } from 'src/app/modules/auth/services/auth-guard.guard';
import { PerfilComponent } from './components/perfil/perfil.component';

//Lista de usuarios
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

const routes: Routes = [
  { path: 'admin', component: HomeAdminComponent, canActivate: [AuthGuard], data: { role: 'adm' } },
  {
    path: 'docente',
    component: HomeDocenteComponent,
    canActivate: [AuthGuard], data: { role: 'doc' },
  },
  {
    path: 'estudiante',
    component: HomeEstudianteComponent,
    canActivate: [AuthGuard], data: { role: 'est' },
  },
  { path: 'materia', component: MateriaComponent, canActivate: [AuthGuard], data: { role: 'est' }||{ role: 'doc' } },
  {
    path: 'lista',
    component: ListaUsuariosComponent,
    canActivate: [AuthGuard], data: { role: 'adm' }
  },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard], data: { role: ['est' && 'doc'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[AuthGuard, AuthService]
})
export class HomeRoutingModule {}
