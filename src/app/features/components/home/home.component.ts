import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { CategoriesSliderComponent } from './components/categories-slider/categories-slider.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { RouterLink } from '@angular/router';
import { CartServiceService } from '../../../shared/services/Cart/cart-service.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { CardComponent } from "../../../shared/components/CardComponent/card/card.component";

@Component({
  selector: 'app-home',
  imports: [CategoriesSliderComponent, MainSliderComponent, RouterLink, CurrencyPipe, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor(
    private _ProductsService: ProductsService,
    private _CartServiceService: CartServiceService,
    private _ToastrService: ToastrService
  ) {}
  products: IProduct[] = [];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(pageNumber: number = 1): void {
    this._ProductsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        pageNumber = res.metadata.currentPage;
        this.products = res.data;
      },
    });
  }

  showSuccess() {}
}
