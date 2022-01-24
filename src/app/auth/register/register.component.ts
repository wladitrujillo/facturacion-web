import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/core/model/company';
import { User } from 'src/app/core/model/user';
import { AlertService } from 'src/app/core/service/alert.service';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
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
    private alertService: AlertService) {
    console.log('Entro al constructor');
  }

  ngOnInit() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('register-page');
    body.classList.add('off-canvas-sidebar');
    this.registerForm = this.formBuilder.group({
      ruc: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    console.log('ngOnInit del register')
  }
  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('register-page');
    body.classList.remove('off-canvas-sidebar');
    console.log("Entro al ngDestroy del register");
  }

  // for accessing to form fields
  get fval() { return this.registerForm.controls; }


  enviarRegistro() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;

    let company: Company = {
      ruc: this.registerForm.value.ruc,
      name: '',
      address: '',
      email: '',
      phone: ''
    }
    let user: User = new User()

    user.firstName = this.registerForm.value.firstName;
    user.lastName = this.registerForm.value.lastName;
    user.email = this.registerForm.value.email;
    user.password = this.registerForm.value.password;

    this.authenticationService.register(company, user)
      .subscribe(
        data => {
          this.loading = false;
          this.alertService.info("Revisa tu correo electrónico para activar tu cuenta");
          this.router.navigate(['/auth/login']);
        },
        error => {
          //this.toastr.error(error.error.message, 'Error');
          this.loading = false;
          this.alertService.error(error);
        });

  }


}
