import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpErrorResponse,
  HttpHandlerFn,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import Cookies from 'js-cookie';
import { UserStore } from '../../store/user.store';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) {
  const userStore = inject(UserStore);
  let refresh = false;
  let authReq = req;
  const token = Cookies.get('authToken');

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if ((error.status === 401 || error.status === 403) && !refresh) {
        refresh = true;

        const retryToken = Cookies.get('authToken');
        const username = Cookies.get('username');

        if (retryToken && username) {
          userStore.setLoggedIn(true);

          const retriedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${retryToken}`,
            },
          });

          return next(retriedReq);
        } else {
          userStore.logOut();
        }
      }

      refresh = false;
      return throwError(() => error);
    })
  );
}
