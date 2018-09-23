import { map } from 'rxjs/operators';
import { ALL_USERS_QUERY, AllUsersQuery } from './user.graphql';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

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
}
