import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SlidesComponent } from './slides/slides.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'slides', component: SlidesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
