import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    userForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private alertService: AlertService,
        private userService: UserService
    ) { }

    ngOnInit() {

        let user: User = this.route.snapshot.data['user'] || new User();

        this.userForm = this.formBuilder.group({
            _id: [user._id],
            firstName: [user.firstName, Validators.required],
            lastName: [user.lastName, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
            phone: [user.phone],
            address: [user.address],
            country: [user.country],
            city: [user.city],
            postal: [user.postal],
            about: [user.about],
        })


    }

    onFormSubmit() {
        if (this.userForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.update(this.userForm.value).subscribe(this.onSuccess, this.onError);
    }

    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }
    private onSuccess = () => {
        this.loading = false;
        this.alertService.success("Guardado exitosamente", 1000);
    }

    private onError = (error) => {
        this.loading = false;
        this.alertService.error(error);
    }

}
