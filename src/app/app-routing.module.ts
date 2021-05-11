import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { SingleReportComponent } from './single-report/single-report.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';


const routes: Routes = [
  {path:'dashboard',canActivate: [AuthGuard],component:DashboardComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'profile/:id',canActivate: [AuthGuard],component:ProfileComponent},
  {path:'report/:id',canActivate: [AuthGuard],component:SingleReportComponent},
  {path:'users',canActivate: [AuthGuard],component:UsersComponent},
  {path:'reports',canActivate: [AuthGuard],component:ReportsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
