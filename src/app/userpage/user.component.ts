import { Component, OnInit } from '@angular/core';
import { User } from '../core/model/user';
import { AlertService } from '../core/service/alert.service';
import { UserService } from '../core/service/user.service';

@Component({
    selector: 'app-user-cmp',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {

    user: User = new User();
    loading = false;

    constructor(private alertService: AlertService,
        private userService: UserService) { }

    ngOnInit() {

        this.userService.getProfileInfo()
            .subscribe(
                user => {
                    this.user = user;
                },
                error => {

                    this.alertService.error(error);
                });

    }

    onSubmit(){
        this.loading=true;
        this.userService.update(this.user).subscribe(
            user => {
                this.loading=false;              
            },
            error => {
                this.loading=false;
                this.alertService.error(error);
            });
    }
}
