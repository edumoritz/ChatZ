import { User } from './../models/user.model';
import { map } from 'rxjs/operators';
import { ALL_USERS_QUERY, AllUsersQuery, GET_USER_BY_ID_QUERY, UserQuery } from './user.graphql';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private appolo: Apollo
  ) { }

  allUsers(idToExclude: string): Observable<User[]>{
    return this.appolo.query<AllUsersQuery>({
      query: ALL_USERS_QUERY,
      variables: {
        idToExclude: idToExclude
      }
    }).pipe(
      map(res => res.data.allUsers)
    )
  }

  getUserById(id: string): Observable<User> {
    return this.appolo
      .query<UserQuery>({
        query: GET_USER_BY_ID_QUERY,
        variables: { userId: id }
      }).pipe(
        map(res => res.data.User)
      )
  }
}
