
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { UserDataSource } from './user.datasource';
import { MatPaginator } from '@angular/material';
import { MatSort } from "@angular/material/sort";
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Role } from 'src/app/core/model/role';
import { User } from 'src/app/core/model/user';
import { RoleService } from 'src/app/core/service/role.service';
import { UserService } from 'src/app/core/service/user.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {


  dataSource: UserDataSource;

  displayedColumns = ["firstName", "lastName", "email", "role", "actions"];

  roles: Role[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private http: HttpClient) {
  }


  ngOnInit() {

    this.dataSource = new UserDataSource(this.http);

    this.dataSource.load('', 'asc', 0, 5);

    this.roleService.getRoles().subscribe(roles => this.roles = roles);

  }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();

  }

  loadPage() {
    this.dataSource.load(
      '',
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }


  onDelete(index: number, e: User) {
    this.userService.delete(e._id)
      .subscribe(() => this.dataSource.removeData((this.paginator.pageIndex * this.paginator.pageSize) + index));

  }

}
