import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AdDetailsComponent } from './components/ad-details/ad-details.component';
import { AddAdsComponent } from './components/add-ads/add-ads.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MyAdsComponent } from './components/my-ads/my-ads.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './service/auth.guard';

const routes: Routes = [
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "add",
    component: AddAdsComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "ads/:id",
    component: AdDetailsComponent,
    // canActivate: [
    //   AuthGuard
    // ]
  },
  {
    path: "my-ads",
    component: MyAdsComponent,
    // canActivate: [
    //   AuthGuard
    // ]
  },
  {
    path: "profile/:username",
    component: ProfileComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "edit-profile/:id",
    component: EditProfileComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "edit-ad/:id",
    component: EditAdComponent,
    canActivate: [
      AuthGuard
    ]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [
      AuthGuard
    ], data:{roles:['ROLE_ADMIN']}
  },
  {
    path: "messages/:id",
    component: MessagesComponent,
    // canActivate: [
    //   AuthGuard
    // ]
  },
  {
    path: "about",
    component: AboutComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
