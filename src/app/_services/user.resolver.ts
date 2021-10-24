import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { User } from "../_models/user";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable()
export class UserResolver implements Resolve<User> {

    constructor(private userService: UserService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        return this.userService.getById(route.params['_id']);
    }

}