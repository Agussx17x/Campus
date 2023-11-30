import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service'; // Asegúrate de tener un servicio para manejar Firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    // Inicia el flujo de autenticación
    return this.afAuth.authState.pipe(
      // Toma el primer valor emitido por el flujo de autenticación
      take(1),
      // Cambia al flujo del usuario
      switchMap((user) => {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión y emite 'false'
        if (!user) {
          this.router.navigate(['/login']);
          return of(false);
        } else {
          // Si el usuario está autenticado, obtiene las credenciales del usuario desde Firestore
          return this.firestoreService.obtenerUsuario(user.uid).pipe(
            map((usuario) => {
              // Almacena las credenciales del usuario
              const credentials = usuario.credencial;

              // Obtiene los roles esperados de la ruta
              const expectedRoles = route.data['roles'];

              // Si no hay roles esperados, emite 'true'
              if (!expectedRoles) {
                return true;
              }
              // Verifica si las credenciales del usuario están en los roles esperados
              const hasValidRole = expectedRoles.includes(credentials);

              // Si el usuario no tiene un rol válido, redirige a la página de inicio y emite 'false'
              if (!hasValidRole) {
                this.router.navigate(['/']);
                return false;
              }
              // Si el usuario tiene un rol válido, emite 'true'
              return true;
            })
          );
        }
      })
    );
  }
}