import { Component, inject, OnInit } from '@angular/core';
import { OrdersServiceService } from '../../../../shared/services/Orders/orders-service.service';
import { AuthServiceService } from '../../../../shared/services/Auth/auth-service.service';
import { IOrders } from '../../../../core/interfaces/iorders.interface';
import { ICartInterface } from '../../../../core/interfaces/icart-interface.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent implements OnInit {
  private readonly _OrdersServiceService = inject(OrdersServiceService);
  private readonly _AuthServiceService = inject(AuthServiceService);

  userOrders!: IOrders[];

  ngOnInit(): void {
    this._AuthServiceService.decodeToken();
    this._OrdersServiceService.getUserOrders(this._AuthServiceService.userInfo.id).subscribe({
      next: (res) => {
        console.log(res);
        this.userOrders = res;
      },
    });
  }
}
