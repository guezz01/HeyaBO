import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SidebarModule } from 'ng-sidebar';
import {NgxPaginationModule} from 'ngx-pagination';
import { LightboxModule } from 'ngx-lightbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { from } from 'rxjs';
import { AuthGuard } from './auth.guard';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { TopBarComponent } from './layout/top-bar/top-bar.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { UsersComponent } from './pages/users/users.component';
import { SingleReportComponent } from './pages/composition/single-report/single-report.component';
import { PostComponent } from './pages/composition/post/post.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfilePostsComponent } from './pages/composition/profile-posts/profile-posts.component';
import { ProfileReportsComponent } from './pages/composition/profile-reports/profile-reports.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from '@coreui/angular';
import { ProfileCommentsComponent } from './pages/composition/profile-comments/profile-comments.component';
import { UserRatesComponent } from './pages/composition/user-rates/user-rates.component';
import { UserListComponent } from './pages/composition/user-list/user-list.component';
import { NewClientChartComponent } from './pages/composition/charts/new-client-chart/new-client-chart.component';
import { ClientDifferenceChartComponent } from './pages/composition/charts/client-difference-chart/client-difference-chart.component';
import { ReportAvgTreatChartComponent } from './pages/composition/charts/report-avg-treat-chart/report-avg-treat-chart.component';
import { ReportOpenCloseChartComponent } from './pages/composition/charts/report-open-close-chart/report-open-close-chart.component';
import { ReportListComponent } from './pages/composition/report-list/report-list.component';
import { PostInteractionChartComponent } from './pages/composition/charts/post-interaction-chart/post-interaction-chart.component';
import { PostCountRoleChartComponent } from './pages/composition/charts/post-count-role-chart/post-count-role-chart.component';
import { PostListComponent } from './pages/composition/post-list/post-list.component';
import { PostsComponent } from './pages/posts/posts.component';
import { RatingCountChartComponent } from './pages/composition/charts/rating-count-chart/rating-count-chart.component';
import { RatingTopProChartComponent } from './pages/composition/charts/rating-top-pro-chart/rating-top-pro-chart.component';
import { RatingListComponent } from './pages/composition/rating-list/rating-list.component';
import { RatingsComponent } from './pages/ratings/ratings.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { CommentCountChartComponent } from './pages/composition/charts/comment-count-chart/comment-count-chart.component';
import { CommentUserActivityChartComponent } from './pages/composition/charts/comment-user-activity-chart/comment-user-activity-chart.component';
import { CommentListComponent } from './pages/composition/comment-list/comment-list.component';
import { SingleRatingComponent } from './pages/composition/single-rating/single-rating.component';
import { ActivityChartComponent } from './pages/composition/charts/activity-chart/activity-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideBarComponent,
    TopBarComponent,
    ProfileComponent,
    ReportsComponent,
    UsersComponent,
    SingleReportComponent,
    PostComponent,
    ProfilePostsComponent,
    ProfileReportsComponent,
    ProfileCommentsComponent,
    UserRatesComponent,
    UserListComponent,
    NewClientChartComponent,
    ClientDifferenceChartComponent,
    ReportAvgTreatChartComponent,
    ReportOpenCloseChartComponent,
    ReportListComponent,
    PostInteractionChartComponent,
    PostCountRoleChartComponent,
    PostListComponent,
    PostsComponent,
    RatingCountChartComponent,
    RatingTopProChartComponent,
    RatingListComponent,
    RatingsComponent,
    CommentsComponent,
    CommentCountChartComponent,
    CommentUserActivityChartComponent,
    CommentListComponent,
    SingleRatingComponent,
    ActivityChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    LightboxModule,
    CarouselModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SidebarModule.forRoot()
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
