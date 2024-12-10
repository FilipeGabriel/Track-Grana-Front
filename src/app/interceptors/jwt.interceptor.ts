import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authToken = localStorage.getItem('authToken');

    const authReq = authToken
        ? req.clone({
            headers: req.headers.set('Authorization', `Bearer ${authToken}`),
        })
        : req;

    return next(authReq);
};
