import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('access_token');

    if (authToken) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`), // Use o token diretamente
        });
        return next(authReq);
    }

    return next(req);
};
