import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrolledCoursesRoutingModule } from './enrolled-courses-routing.module';
import { EnrolledCousesListComponent } from './enrolled-couses-list/enrolled-couses-list.component';


@NgModule({
  declarations: [
    EnrolledCousesListComponent
  ],
  imports: [
    CommonModule,
    EnrolledCoursesRoutingModule
  ]
})
export class EnrolledCoursesModule { }
