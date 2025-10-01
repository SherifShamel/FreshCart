import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../Products/products.service';
import { IProduct } from '../../../../../core/interfaces/iproduct.interface';
import { CardComponent } from '../../../../components/CardComponent/card/card.component';

@Component({
  selector: 'app-brand-products',
  imports: [CardComponent],
  templateUrl: './brand-products.component.html',
  styleUrl: './brand-products.component.css',
})
export class BrandProductsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductsService = inject(ProductsService);

  brandName: string = '';
  brandId!: string;
  products!: IProduct[];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.brandId = params.get('b_id')!;
      },
    });
    this.getBrandProducts();
  }
  getBrandProducts() {
    this._ProductsService.getAllProducts(1, undefined, this.brandId).subscribe({
      next: (res) => {
        if (res.results != 0) {
          this.products = res.data;
          this.brandName = res.data[0].brand.name;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
