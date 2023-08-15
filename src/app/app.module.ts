import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos
import { SharedModule } from './shared/shared.module';
import { InicioRoutingModule } from './modules/inicio/inicio-routing.module';
import { NosotrosRoutingModule } from './modules/nosotros/nosotros-routing.module';
import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { AngularFireStorageModule } from "@angular/fire/compat/storage";


@NgModule({
  declarations: [

    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    InicioRoutingModule,
    NosotrosRoutingModule,
    AuthRoutingModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
