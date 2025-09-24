import { Component, inject, input, Input, InputSignal, signal } from '@angular/core';
import { IProduct } from '../../../../core/interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartServiceService } from '../../../services/Cart/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../services/Wishlist/wishlist.service';
import 'animate.css';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly _CartServiceService = inject(CartServiceService);
  private readonly _WishlistService = inject(WishlistService);
  private readonly _ToastrService = inject(ToastrService);

  product: InputSignal<IProduct> = input({} as IProduct);
  flagged: boolean = false;

  addToCart(p_id: string) {
    this._CartServiceService.addProductToCart(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartServiceService.cartCount.set(res.numOfCartItems);
        this._ToastrService.success(res.message, res.status);
      },
    });
  }

  addToWishList(p_id: string) {
    this._WishlistService.addProductToWishlist(p_id).subscribe({
      next: (res) => {
        // if id == res.data[item]
        for (const item of res.data) {
          if (p_id == item) {
            console.log('already there');
            this.flagged = true;
            break;
          } else {
            console.log('No No No');
          }
        }
        this._ToastrService.success(res.message, res.status);
        console.log(res);
      },
    });
  }
}
