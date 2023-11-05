import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service'; // Asegúrate de tener un servicio para manejar Firestore
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private firestoreService: FirestoreService, private router: Router, private afAuth: AngularFireAuth) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return new Observable<boolean>(observer => observer.next(false));
        } else {
          // Aquí obtienes las credenciales del usuario desde Firestore
          return this.firestoreService.obtenerUsuario(user.uid).pipe(
            map(usuario => {
              const credentials = usuario.credencial;
              
              // Verificas si el usuario tiene el rol necesario para acceder a la ruta
              if (route.data['role'] && route.data['role'] !== credentials) {
                this.router.navigate(['/']);
                return false;
              }
              return true;
            })
          );
        }
      })
    );
  }
}