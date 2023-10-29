import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSeccComponent } from './components/form-secc/form-secc.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { MatProgressBarModule } from "@angular/material/progress-bar";



@NgModule({
  declarations: [
    AdminComponent,
    TableComponent,
    FormSeccComponent,
    DropdownComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AdminComponent,
    TableComponent,
    FormSeccComponent,
    DropdownComponent,

  ]
})
export class AdminModule { }
