import { AUTHENTICATE_USER_MUTATION, SIGNUP_USER_MUTATION } from './auth.graphql';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  redirectUrl: string;
  private _isAuthenticated = new ReplaySubject<boolean>(1);

  constructor(
    private apollo: Apollo
  ) {
    //Testes
    // this.isAuthenticated.subscribe(res => {
    //   console.log('AuthState', res); // aguarda next ser chamado
    // });

    // let authState = false;
    // setInterval(() => {
    //   this._isAuthenticated.next(authState);
    //   authState = !authState;
    // }, 5000);

    this.isAuthenticated.subscribe(is => console.log('AuthState', is));

  }

  get isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  signinUser(variables: {email: string, password: string}): Observable<{id: string, token: string}> {
    return this.apollo.mutate({
      mutation: AUTHENTICATE_USER_MUTATION,
      variables
    }).pipe(
      map(res => res.data.authenticateUser),
      tap(res => this.setAuthState(res !== null)), //executa logica no retorno do map
      catchError(err => {
        this.setAuthState(false);
        return throwError(err);
      })
    );
  }

  signupUser(variables: {name: string, email: string, password: string}): Observable<{id: string, token: string}> {
    return this.apollo.mutate({
      mutation: SIGNUP_USER_MUTATION,
      variables
    }).pipe(
      map(res => res.data.signupUser),
      tap(res => this.setAuthState(res !== null)),
      catchError(err => {
        this.setAuthState(false);
        return throwError(err);
      })
    );
  }

  private setAuthState(isAuthenticated: boolean): void {
    this._isAuthenticated.next(isAuthenticated);
  }
}
