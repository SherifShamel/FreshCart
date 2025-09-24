import { Component, inject, OnInit } from '@angular/core';
import { CartServiceService } from '../../../shared/services/Cart/cart-service.service';
import { ICartInterface } from '../../../core/interfaces/icart-interface.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private readonly _CartServiceService = inject(CartServiceService);
  private readonly _ToastrService = inject(ToastrService);

  cartItems: ICartInterface = {} as ICartInterface;
  totalCartPrice: number = 0;

  ngOnInit(): void {
    this._CartServiceService.getLoggeduserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.totalCartPrice = res.data.totalCartPrice;
        this.cartItems = res.data;
      },
    });
  }

  changeCount(p_id: string, count: number) {
    this._CartServiceService.updateCartProductQuantity(p_id, count).subscribe({
      next: (res) => {
        this.cartItems = res.data;
        this._CartServiceService.cartCount = res.data.length;
        this.totalCartPrice = this.cartItems.totalCartPrice;
        console.log(res);
      },
    });
  }

  removeItem(p_id: string) {
    this._CartServiceService.removeSpeceficCartItem(p_id).subscribe({
      next: (res) => {
        this.cartItems = res.data;
        this._CartServiceService.cartCount.set(res.numOfCartItems);
        this.totalCartPrice = this.cartItems.totalCartPrice;
        console.log(res);
        this._ToastrService.info(res.message, res.status);
      },
    });
  }
}
