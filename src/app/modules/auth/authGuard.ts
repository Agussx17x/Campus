import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard{
  constructor(private authService: AuthService, private router: Router) {}

  autentificacion(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(user => {
        if (user) {
          return true; // Usuario autenticado, permitir acceso
        } else {
          return this.router.createUrlTree(['/login']); // Redirigir a la página de inicio de sesión
        }
      })
    );
  }
}