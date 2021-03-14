import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: User = {}

  constructor(
    private githubService: GithubService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const username = this.activatedRoute.snapshot.paramMap.get('username');

    this.getUser(username);
  }

  private getUser(username: string) {
    this.githubService.getUserWithDetails(username).subscribe(
      response => {
        this.user = response;
      });
  }
}
