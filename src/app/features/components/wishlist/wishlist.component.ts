import { Component, input, InputSignal, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService: WishlistService, private _ToastrService: ToastrService) {}

  wishProduct!: IProduct[];

  ngOnInit(): void {
    this.getWishedProducts();
  }

  getWishedProducts() {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishProduct = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProduct(p_id: string) {
    this._WishlistService.removeProductFromWishList(p_id).subscribe({
      next: (res) => {
        console.log(res);
        this.getWishedProducts();
        this._ToastrService.success(res.message, res.status);
      },
      error: (err) => {
        console.log(err);
        this._ToastrService.error(err.message, err.status);
      },
    });
  }
}
