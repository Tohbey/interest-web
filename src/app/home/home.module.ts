import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { BuddiesComponent } from './buddies/buddies.component';
import { DiscoverComponent } from './discover/discover.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeComponent } from './home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    ProfileComponent,
    BuddiesComponent,
    DiscoverComponent,
    SettingsComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    ProfileComponent,
    BuddiesComponent,
    DiscoverComponent,
    SettingsComponent,
    HomeComponent,
    NavbarComponent
  ]
})
export class HomeModule { }
