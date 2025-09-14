import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { HomeComponent } from './features/components/home/home.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { CartComponent } from './features/components/cart/cart.component';
import { ProductsComponent } from './features/components/products/products.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { CheckoutComponentComponent } from './features/components/checkout/checkout-component/checkout-component.component';
import { AllOrdersComponent } from './features/components/AllOrders/all-orders/all-orders.component';
import { WishlistComponent } from './features/Wishlist/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuardGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'checkout/:c_id', component: CheckoutComponentComponent, title: 'Checkout' },
      { path: 'allorders', component: AllOrdersComponent, title: 'All Orders' },
      { path: 'categories', component: CategoriesComponent, title: 'Categories' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'wishlist', component: WishlistComponent, title: 'Wishlist' },
      {
        path: 'p_details/:p_id',
        loadComponent: () =>
          import('./features/components/p-details/p-details.component').then(
            (c) => c.PDetailsComponent
          ),
        title: 'Product details',
      },
    ],
  },
  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
