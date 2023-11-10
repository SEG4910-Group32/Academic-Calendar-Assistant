import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard  {

  constructor(
    public router: Router
  ) {}

  // Auth guard to only allow pages to be viewed if a user is signed in
  // Otherwise, redirect to homepage
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if (localStorage.getItem("currUser")) {
        return true;
      }

      console.log(route);

      this.router.navigate(['/home'], { queryParams: { redirect: true, path: route.routeConfig?.path }});
      
      return false;
  }
  
}
