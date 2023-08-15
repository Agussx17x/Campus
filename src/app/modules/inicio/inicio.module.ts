import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './page/inicio/inicio.component';
import { CardComponent } from 'src/app/shared/card/card.component';
import { SharedModule } from 'src/app/shared/shared.module';




@NgModule({
    declarations: [
        InicioComponent,
    ],
    exports: [
        InicioComponent,
    ],
    imports: [
        SharedModule,
        CommonModule,
        InicioRoutingModule,
    ]
})
export class InicioModule { }
