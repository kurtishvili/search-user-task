import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { map, switchMap } from "rxjs/operators"
import { environment } from "src/environments/environment";

@Injectable()
export class GithubService {

    constructor(private httpClient: HttpClient) { }

    getUsers() {
        return this.httpClient.get<any>(`${environment.githubApiBaseUri}/search/users?q=followers%3A>%3D1000&per_page=8`)
            .pipe(map(response => response.items))
    }

    getUserRepos(link: string) {
        return this.httpClient.get<string>(`${link}?per_page=3`)
    }

    getUser(username: string) {
        return this.httpClient.get<User>(`${environment.githubApiBaseUri}/users/${username}`);
    }

    getUserWithDetails(username: string) {
        return this.httpClient.get<User>(`${environment.githubApiBaseUri}/users/${username}`)
            .pipe(switchMap(
                (user: any) => {
                    return this.httpClient.get(`${user.repos_url}?per_page=3`)
                        .pipe(switchMap(
                            (repos: any) => {
                                return this.httpClient.get(`${user.organizations_url}?per_page=3`).pipe(map(organizations => {
                                    return {
                                        ...user,
                                        repos,
                                        organizations
                                    }
                                }))
                            }))
                }));
    }
}