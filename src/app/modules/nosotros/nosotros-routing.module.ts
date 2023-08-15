import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NosotrosComponent } from './page/nosotros/nosotros.component';

const routes: Routes = [
 {
  path: 'nosotros', component: NosotrosComponent
 },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NosotrosRoutingModule { }
