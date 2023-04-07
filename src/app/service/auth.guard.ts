import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  match: boolean = false
  constructor(private authSrv: AuthService, private router: Router){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(!localStorage.getItem('user')){
        this.router.navigate(['/login'])
      }

      else{
      const allowed = route.data['roles'] as Array<string>;
      const roles =  JSON.parse(localStorage.getItem('user')!).roles

      if(allowed){
        allowed.forEach(e =>{
          roles.forEach((r:any)=>{
            if(e == r){
              this.match = true;
              return true
            } return
          });
        }); return this.match
      } else {
        return this.authSrv.toggle
      }
      }

    return this.authSrv.toggle;
  }

}
