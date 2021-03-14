import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GridItemComponent } from './user-search/grid-item/grid-item.component';
import { ListItemComponent } from './user-search/list-item/list-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GithubService } from 'src/app/services/github.service';
import { UserNotFoundComponent } from './user-not-found/user-not-found.component';


@NgModule({
  declarations: [
    UserSearchComponent,
    UserProfileComponent,
    GridItemComponent,
    ListItemComponent,
    UserNotFoundComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    GithubService
  ]
})
export class UserModule { }
