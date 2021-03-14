import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSearchComponent } from './user-search/user-search.component';

const routes: Routes = [
  {
    path: '',
    component: UserSearchComponent,
    pathMatch: 'full'
  },
  {
    path: ':username',
    component: UserProfileComponent
  },
  {
    path: 'user/not-found',
    component: UserNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
