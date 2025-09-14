import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../shared/services/Wishlist/wishlist.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistService: WishlistService) {}

  wishProduct!: IProduct[];

  ngOnInit(): void {
    this._WishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        this.wishProduct = res.data;
        console.log(res);
      },
    });
  }
}
