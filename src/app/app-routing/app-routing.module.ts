import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {routes} from './routes';
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [CommonModule,
            RouterModule.forRoot(routes)
            ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
