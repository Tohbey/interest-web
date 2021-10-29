import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuddiesComponent } from './buddies/buddies.component';
import { DiscoverComponent } from './discover/discover.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo:'profile'},
  {path:'profile', component: ProfileComponent},
  {path:'discover', component: DiscoverComponent},
  {path:'settings', component: SettingsComponent},
  {path:'buddies', component:BuddiesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
