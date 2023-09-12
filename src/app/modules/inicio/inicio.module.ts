import { NgModule } from '@angular/core';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { MateriasComponent } from './home/components/materias/materias.component';

@NgModule({
    declarations: [
        InicioComponent,
        MateriasComponent,
    ],
    imports: [
        InicioRoutingModule,
    ],
    exports: [
        InicioComponent,
    ],
})
export class InicioModule { }
