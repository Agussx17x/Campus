import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Guard
import { AdminGuard } from './shared/guard/admin.guard';

// Carga perezosa de Modulos (se importan dentro del routes). 

const routes: Routes = [
  // Rutas de Modulos
  {
    path: '',
    redirectTo: 'inicio', // En caso de que se escriba mal la url, redirige al inicio.
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then((m) => m.InicioModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/inicio/page/home/home.module').then( // Modulo de los Home de Est, Doc, y Adm.
        (m) => m.HomeModule
      ),
    canActivate: [AdminGuard],
    data: { preload: true }, //agregue canActive
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/nosotros/nosotros.module').then(
        (m) => m.NosotrosModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: 'inicio', // En caso de que se escriba mal la url, redirige al inicio.
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
