import { NgModule } from '@angular/core';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';

@NgModule({
    declarations: [
        InicioComponent,
    ],
    imports: [
        InicioRoutingModule,
    ],
    exports: [
        InicioComponent,
    ],
})
export class InicioModule { }
