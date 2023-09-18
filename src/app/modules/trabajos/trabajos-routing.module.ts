import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrabajosComponent } from './pages/trabajos/trabajos.component';

const routes: Routes = [
  {
    path: "trabajos", component: TrabajosComponent                                  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrabajosRoutingModule { }
