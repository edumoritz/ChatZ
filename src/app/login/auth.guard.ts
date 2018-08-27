import { AuthService } from './../core/services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
  Router
} from '@angular/router';
import { LoginRoutingModule } from './login-routing.module';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: LoginRoutingModule
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkAuthState(state.url)
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    // route.path
    const url = window.location.pathname;
    return this.checkAuthState(url) // acessa o isAuthenticated e
      .pipe(take(1))  // pege somente o primeiro primeiro valor emitido
  }

  private checkAuthState(url: string): Observable<boolean> {
    return this.authService.isAuthenticated
      .pipe(tap(is => {
        if(!is) { // se o usuario não estiver autenticado faça o redirect
          this.authService.redirectUrl = url; // salva a url tentada antes da autenticação
          this.router.navigate(['/login']);
        }
      }));
  }

}
