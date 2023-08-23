import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AngularFireAuth, private router: Router) {}

  canActivate() {
    return this.auth.authState.pipe(
      take(1),
      map(user => {
        if (user) {
          return true; // Usuario autenticado
        } else {
          this.router.navigate(['/inicio']); // Redirige al inicio si no está autenticado
          return false;
        }
      })
    );
  }
}