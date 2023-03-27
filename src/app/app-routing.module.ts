import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { SingleReportComponent } from './pages/composition/single-report/single-report.component';
import { PostComponent } from './pages/composition/post/post.component';
import { UsersComponent } from './pages/users/users.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { ProfilePostsComponent } from './pages/composition/profile-posts/profile-posts.component';
import { ProfileReportsComponent } from './pages/composition/profile-reports/profile-reports.component';
import { NewClientChartComponent } from './pages/composition/charts/new-client-chart/new-client-chart.component';
import { PostsComponent } from './pages/posts/posts.component';
import { RatingsComponent } from './pages/ratings/ratings.component';
import { RatingTopProChartComponent } from './pages/composition/charts/rating-top-pro-chart/rating-top-pro-chart.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path:'dashboard',canActivate: [AuthGuard],component:DashboardComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'profile/:id',canActivate: [AuthGuard],component:ProfileComponent},
  {path:'report/:id',canActivate: [AuthGuard],component:SingleReportComponent},
  {path:'post/:id',canActivate: [AuthGuard],component:PostComponent},
  {path:'users',canActivate: [AuthGuard],component:UsersComponent},
  {path:'reports',canActivate: [AuthGuard],component:ReportsComponent},
  {path:'profilePosts/:id',canActivate: [AuthGuard],component:ProfilePostsComponent},
  {path:'profileReports/:id',canActivate: [AuthGuard],component:ProfileReportsComponent},
  {path:'posts',canActivate: [AuthGuard],component:PostsComponent},
  {path:'ratings',canActivate: [AuthGuard],component:RatingsComponent},
  {path:'comments',canActivate: [AuthGuard],component:CommentsComponent},
  {path:'reset-password',component:ResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
