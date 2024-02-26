import { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {

  if (!req.url.includes('/data/')) {
    return next(req);
  }

  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  // Verificar si la solicitud necesita autenticación
  if (req.headers.get('No-Auth') === 'True') {
    return next(req);
  }

  // Clonar la solicitud y agregar el header Authorization
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  // Retornar la solicitud modificada
  return next(authReq);
  
}