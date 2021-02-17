import { Component, OnInit } from '@angular/core';
import {ICompany} from '@copmany/components/model/company.interface';
import {AuthService} from '../../../login/services/auth/auth.service';
import {NotificationService} from '@shared/services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  user;

  showCompanyForm = false;

  mode: string;

  selectedCompany: ICompany;

  actions = [{
    icon: 'create',
    tooltip: 'edit',
    handler: (row) => {
      this.mode = 'edit';
      this.selectedCompany = { ...row };
      this.showCompanyForm = true;
    }
  }];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = {}
  }

  registerUser() {
    this.authService.register(this.user).toPromise()
      .then((res) => {
        NotificationService.showNotification('success', 'Success', 'Successfuly registered new user. You can now log in to your account.');
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.error(err);
        NotificationService.showNotification('danger', 'Error', 'Error registering new userser please try again later.');
      })
  }
}
