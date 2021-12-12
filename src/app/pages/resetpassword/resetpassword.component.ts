import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/service/alert.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { PasswordValidation } from '../../_helpers/password.validator';

@Component({
    selector: 'app-reset-password',
    templateUrl: './resetpassword.template.html'
})

export class ResetPasswordComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    resetPasswordForm: FormGroup;
    loading = false;
    submitted = false;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;

    constructor(
        private element: ElementRef,
        private router: Router,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder,
        private activateRoute: ActivatedRoute,
        private alertService: AlertService) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;

    }

    isFieldValid(form: FormGroup, field: string) {
        return !form.get(field).valid && form.get(field).touched;
    }


    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 300);

        this.resetPasswordForm = this.formBuilder.group({
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: PasswordValidation.MatchPassword
        });
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
    }

    // for accessing to form fields
    get fval() { return this.resetPasswordForm.controls; }

    onFormSubmit() {
        this.submitted = true;
        if (this.resetPasswordForm.invalid) {
            return;
        }

        const requestId = this.activateRoute.snapshot.paramMap.get('token');
        this.loading = true;
        this.authenticationService
            .resetPassword(requestId, this.fval.password.value).subscribe(
                data => {
                    this.loading = false;
                    this.router.navigate(['/auth/login']);
                },
                error => {
                    //this.toastr.error(error.error.message, 'Error');
                    this.loading = false;
                    this.alertService.error(error);
                });;

    }
}
