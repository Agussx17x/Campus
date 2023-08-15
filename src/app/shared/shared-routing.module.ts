import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CalendaryComponent } from './calendary/calendary.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [
  {
    path:'',component:NavbarComponent
  },
  {
    path:'',component:FooterComponent
  },
  {
    path:'',component:CalendaryComponent
  },
  {
    path:'',component:CardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
