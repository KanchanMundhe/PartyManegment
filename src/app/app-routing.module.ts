import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PartyListComponent } from './components/party-list/party-list.component';
import { PartyFormComponent } from './components/party-form/party-form.component';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   { path:"",
//     component:LayoutComponent
//   }
//   { 
//     path: 'parties', 
//     component: PartyListComponent, 
//     canActivate: [AuthGuard] 
//   },
//   { 
//     path: 'parties/new', 
//     component: PartyFormComponent, 
//     canActivate: [AuthGuard] 
//   },
//   { 
//     path: 'parties/:id/edit', 
//     component: PartyFormComponent, 
//     canActivate: [AuthGuard] 
//   },
//   { path: '', redirectTo: '/parties', pathMatch: 'full' },
// ];


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard], // Protect the layout with AuthGuard
    children: [
      { path: 'parties', component: PartyListComponent },
      { path: 'parties/new', component: PartyFormComponent },
      { path: 'parties/:id/edit', component: PartyFormComponent },
      { path: '', redirectTo: 'parties', pathMatch: 'full' },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }