import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrFormComponent } from './pqr-form/pqr-form.component';
import { PqrListComponent } from './pqr-list/pqr-list.component';
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
  { path: 'pqr-form', component: PqrFormComponent },
  { path: 'pqr-list', component: PqrListComponent },
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
