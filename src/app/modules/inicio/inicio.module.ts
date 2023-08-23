import { NgModule } from '@angular/core';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { HomeDocenteComponent } from './page/home-docente/home-docente.component';

@NgModule({
    declarations: [
        InicioComponent,
        HomeDocenteComponent,
    ],
    imports: [
        InicioRoutingModule,
    ],
    exports: [
        InicioComponent,
    ],
})
export class InicioModule { }
