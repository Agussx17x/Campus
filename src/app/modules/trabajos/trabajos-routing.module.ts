import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';
import { DocsComponent } from './pages/docs/docs.component';
import { ImgComponent } from './pages/img/img.component';

const routes: Routes = [
  {
    path: "trabajos", component: TrabajosComponent                                  
  },
  {
    path: "imagenes", component: ImgComponent                                  
  },
  {
    path: "docs", component: DocsComponent                             
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajosRoutingModule { }
