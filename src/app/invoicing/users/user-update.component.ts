
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Location } from '@angular/common';
import { Role } from 'src/app/_models/role';
import { RoleService } from 'src/app/_services/role.service';


@Component({
    selector: 'app-user-update',
    templateUrl: './user-update.component.html'

})

export class UserUpdateComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    minPrice = 0;
    @ViewChild('chipList', { static: true }) chipList;
    @ViewChild('resetUserForm', { static: true }) myNgForm;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    userForm: FormGroup;
    roles: Role[];



    constructor(
        private location: Location,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private roleService: RoleService
    ) {

    }

    ngOnInit() {

        let user = this.route.snapshot.data["user"] || {};

        this.userForm = this.fb.group({
            firstName: [user.firstName || '', [Validators.required]],
            lastName: [user.lastName || '', [Validators.required]],
            email: [user.email || '', [Validators.required, Validators.email]],
            phone: [user.phone || ''],
            address: [user.address || ''],
            role: [user.role || '', [Validators.required]]
        })

        this.roleService.getRoles().subscribe(roles => this.roles = roles);


    }


    onSubmit() {

        if (this.userForm.invalid) {
            return;
        }

        let user = this.route.snapshot.data["user"];

        if (user) {
            this.userForm.value._id = user._id;
            this.userService.update(this.userForm.value)
                .subscribe(
                    user => { this.location.back() });
        } else {
            this.userService.create(this.userForm.value)
                .subscribe(user => { this.location.back() });
        }

    }


    /* Get errors */
    public handleError = (controlName: string, errorName: string) => {
        return this.userForm.controls[controlName].hasError(errorName);
    }




}
