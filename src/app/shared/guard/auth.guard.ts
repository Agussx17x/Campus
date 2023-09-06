import {inject } from '@angular/core';
import {CanMatchFn} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


export const authGuard : CanMatchFn = (route, state) => {

  const authService = inject(AuthService);
  return authService.getAuthToken()
  
}
