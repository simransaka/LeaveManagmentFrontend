import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, ObservableInput, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  return next(req)
  .pipe(
    catchError((error : HttpErrorResponse) :ObservableInput<any> => {
      if(error.status === 0){
        console.error("No internet connecttion"); //client side error
      }
      else{
        switch(error.status){
          case 401 :
            console.warn("Unauthorized. Please login again");  
            break;
          case 403 : 
            console.error('Forbidden. Permission issue');
            break;
          case 404 :
            console.error("Requested resource not found");
            break;
          case 500 :
            console.error("Server error. Please try again later")
            break;
          default :
            console.error("Unexpected error. Please try again");
        }
        console.error(`${error.status} : `, error.message);
      }
      return throwError(() => error);
    })
  );
};
