import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../_services';


import { AlertService } from '../../_services/alert.service';



@Component({
  selector: 'app-register-cmp',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnDestroy {
  test: Date = new Date();

  loading = false;
  submitted = false;
  registerForm: FormGroup;

  constructor(

    private router: Router,
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private alertService: AlertService) { }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');
    this.registerForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      taxId: ['', [Validators.required, Validators.minLength(13)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
  }

  // for accessing to form fields
  get fval() { return this.registerForm.controls; }


  onFormSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }


    this.loading = true;
    this.authenticationService.register(this.registerForm.value)
      .subscribe(
        data => {
          this.loading = false;
          this.router.navigate(['/auth/login']);
        },
        error => {
          //this.toastr.error(error.error.message, 'Error');
          this.loading = false;
          this.alertService.error(error);
        });

  }


}
