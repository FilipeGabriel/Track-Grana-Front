import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('access_token');

    const publicRoutes = ['/auth/register', '/auth/login'];

    const isPublicRoute = publicRoutes.some(route => req.url.includes(route));

    if (authToken && !isPublicRoute) {
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        });
        return next(authReq);
    }

    return next(req);
};
