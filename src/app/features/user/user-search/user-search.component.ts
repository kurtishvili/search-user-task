import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  users: User[] = [];

  username: string;

  displayList: boolean = true;
  displayGrid: boolean = false;

  recentSearches = JSON.parse(sessionStorage.getItem('recent_searches')) || [];

  constructor(
    private githubService: GithubService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  onListClick() {
    this.displayList = true;
    this.displayGrid = false;
  }

  onGridClick() {
    this.displayList = false;
    this.displayGrid = true;
  }

  searchUser() {
    this.githubService.getUser(this.username).subscribe(
      response => {
        this.addRecentSearch(this.username);
        this.router.navigate([this.username])
      },
      error => {
        this.router.navigate(['user', 'not-found'])
      })
  }

  private getUsers() {
    this.githubService.getUsers().subscribe(
      responseUsers => {
        this.users = responseUsers;
        this.users.map((user: any) => {
          this.githubService.getUserRepos(user.repos_url).subscribe(
            responseRepos => {
              user.repos = responseRepos
            })
        })
      })
  }

  private addRecentSearch(username: string) {
    const recentSearches: any[] = JSON.parse(sessionStorage.getItem('recent_searches')) || [];

    recentSearches.push(username);

    if (recentSearches.length > 3) {
      recentSearches.splice(0, 1)
    }

    sessionStorage.setItem('recent_searches', JSON.stringify(recentSearches))
  }
}