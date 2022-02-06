import { HttpClient } from "@angular/common/http";
import { ThisReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})

export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient) {

    }
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAITbtDmhVUgMIefvoviWkFBcW7mwEWet8',
         {
            email: email,
            password: password,
            returnSecureToken: true
         },
        
         ).pipe(tap(resData => {
            const expDate = new Date(new Date().getTime() + +resData.expiresIn*1000 );
            const user = new User(resData.email, resData.localId, resData.idToken, expDate);
            this.user.next(user);
        }));
    }
    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAITbtDmhVUgMIefvoviWkFBcW7mwEWet8',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
            ).pipe(tap(resData => {
                const expDate = new Date(new Date().getTime() + +resData.expiresIn*1000 );
                const user = new User(resData.email, resData.localId, resData.idToken, expDate);
                this.user.next(user);
            }));
    }

    logout(){
        this.user.next(null);
    }

}