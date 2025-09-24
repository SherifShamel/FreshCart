import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AuthServiceService } from '../../../shared/services/Auth/auth-service.service';
import { CartServiceService } from '../../../shared/services/Cart/cart-service.service';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _CartServiceService = inject(CartServiceService);

  username: string = '';

  ngOnInit(): void {
    this._AuthServiceService.decodeToken();
    this.username = this._AuthServiceService.userInfo.name;

    this._CartServiceService.getLoggeduserCart().subscribe({
      next: (res) => {
        this._CartServiceService.cartCount.set(res.numOfCartItems);
      },
    });
  }
}
