import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServiceService } from '../../services/Auth/auth-service.service';
import { CookieService } from 'ngx-cookie-service';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { CartServiceService } from '../../services/Cart/cart-service.service';
import { FormsModule } from '@angular/forms';
import { Show } from '../../directives/show';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule, Show],
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

  check: InputSignal<boolean> = input(false);
  userame: InputSignal<string> = input('');
  badgeNumber: InputSignal<number> = input(0);

  signOut(): void {
    this._Router.navigate(['/login']);
    this._CookieService.delete('token');
    this._AuthServiceService.userInfo = null;
  }

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
    // if (this._CookieService.get('token')) {
    //   this._CartServiceService.getLoggeduserCart().subscribe({
    //     next: (res) => {
    //       this.badgeNumber = res.numOfCartItems;
    //       console.log(res);
    //     },
    //   });
    // }
  }
}
