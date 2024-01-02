import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ResetComponent } from './reset/reset.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './apiService/auth-guard.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { NewsDetailComponent } from './news-detail/news-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'reset', component: ResetComponent },
  { path: 'news', component: NewsDetailComponent,canActivate: [AuthGuardService], data: { allowedRoles: ['ROLE_ADMIN', 'ROLE_CUSTOMER'] } },
  { path: 'whishlist', component: WhishlistComponent,canActivate: [AuthGuardService], data: { allowedRoles: ['ROLE_ADMIN', 'ROLE_CUSTOMER'] } },
  { path: 'userlist', component: ViewUsersComponent, canActivate: [AuthGuardService], data: { allowedRoles:  ['ROLE_ADMIN'] } },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
