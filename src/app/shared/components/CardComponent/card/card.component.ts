import { Component, inject, input, Input, InputSignal, signal } from '@angular/core';
import { IProduct } from '../../../../core/interfaces/iproduct.interface';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartServiceService } from '../../../services/Cart/cart-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly _CartServiceService = inject(CartServiceService);
  private readonly _ToastrService = inject(ToastrService);

  product: InputSignal<IProduct> = input({} as IProduct);

  addToCart(p_id: string) {
    this._CartServiceService.addProductToCart(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this._CartServiceService.count = res.numOfCartItems;
        console.log(this._CartServiceService.count);

        this._ToastrService.success(res.message, res.status);
      },
    });
  }
}
