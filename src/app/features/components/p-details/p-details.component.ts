import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-p-details',
  imports: [CarouselModule],
  templateUrl: './p-details.component.html',
  styleUrl: './p-details.component.css',
})
export class PDetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  productId!: string;
  productDetails: IProduct = {} as IProduct;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('p_id')!;
      },
    });

    this._ProductsService.getSpecificProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay: true,
    autoplayHoverPause: true,
    dots: true,
    navSpeed: 300,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };
}
