import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../core/services/users/users.service';

@Component({
  selector: 'app-clientes-vip',
  standalone: true,
  imports: [],
  templateUrl: './clientes-vip.component.html',
  styleUrl: './clientes-vip.component.scss'
})
export class ClientesVipComponent implements OnInit {
  vipUsers: any[] = [];
  constructor(
    private usersService: UsersService
  ) {
    // this.getVipUsers();
   }


  ngOnInit(): void {
    // Any additional initialization logic can go here
    this.getVipUsers();
  }
  getVipUsers(): void {
    this.usersService.getVipUsers().subscribe({
      next: (response) => {
        console.log('VIP Users:', response);
        
        this.vipUsers = response;
      },
      error: (error) => {
        console.error('Error fetching VIP users:', error);
      }
    });
  }
}
