import { Component, HostListener, inject, input, InputSignal, WritableSignal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../services/Auth/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { CartServiceService } from '../../services/Cart/cart-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private _CookieService: CookieService,
    private _Router: Router,
    private _FlowbiteService: FlowbiteService
  ) {}
  private readonly _AuthServiceService = inject(AuthServiceService);
  private readonly _CartServiceService = inject(CartServiceService);

  userScroll: boolean = false;

  check: InputSignal<boolean> = input(false);

  userame: InputSignal<string> = input('');

  cartCount!: WritableSignal<number>;

  signOut(): void {
    this._Router.navigate(['/login']);
    this._CookieService.delete('token');
    this._AuthServiceService.userInfo = null;
  }

  ngOnInit(): void {
    this.cartCount = this._CartServiceService.cartCount;
    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  @HostListener('window:scroll')
  scrolled() {
    this.userScroll = window.scrollY > 5;
  }
}
