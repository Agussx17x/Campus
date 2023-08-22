import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Componentes

const routes: Routes = [
  //rutas
  {
    path:"", loadChildren:()=>import ("./modules/inicio/inicio.module").then(m=>m.InicioModule)
  },
  {
    path:"", loadChildren:()=>import ("./modules/nosotros/nosotros.module").then(m=>m.NosotrosModule)
  },
  {
    path:"", loadChildren:()=>import ("./modules/auth/auth.module").then(m=>m.AuthModule)
  },
  {
    path : '**', redirectTo: 'inicio', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
