import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){

    }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean> {
       return this.authService.user.pipe(map(user => {
           return !user ? false : true;
       }),
       tap(isAuth =>{
           if (!isAuth){
                this.router.navigate(['/auth']);
           }
       }));
    }
}