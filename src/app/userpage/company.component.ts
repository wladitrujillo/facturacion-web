import { Component, OnInit } from '@angular/core';
import { Company } from '../core/model/company';
import { AdminService } from '../core/service/admin.service';
import { AlertService } from '../core/service/alert.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html'
})
export class CompanyComponent implements OnInit {

  company: Company = new Company();

  loading: boolean = false;



  constructor(
    private adminService: AdminService,
    private alertService: AlertService) { }

  ngOnInit() {

    this.adminService.getCompany()
      .subscribe(company => this.company = company);
  }

  onSubmit() {
    this.loading = true;
    this.adminService.updateCompany(this.company)
      .subscribe(company => {
        this.loading = false;
      },
        error => {
          this.loading = false;
          this.alertService.error(error);
        });
  }

}
