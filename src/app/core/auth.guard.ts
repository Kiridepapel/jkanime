import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      // Si hay un token, permitir el acceso a la ruta protegida.
      return true;
    } else {
      // Si no hay un token, redirigir a la página de inicio de sesión.
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
