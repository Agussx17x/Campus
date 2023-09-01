import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guard/admin.guard';

// Componentes

const routes: Routes = [
  //rutas
  {
    path: '',
    redirectTo: 'login', //cambie inicio por login
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./modules/inicio/inicio.module').then((m) => m.InicioModule), canActivate: [ AdminGuard ],
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
      import('./modules/auth/auth.module').then(
        (m) => m.AuthModule), 
  },
  {
    path: '**',
    redirectTo: 'login',//cambie inicio por login
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
