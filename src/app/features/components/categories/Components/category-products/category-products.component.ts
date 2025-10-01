import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../../shared/services/Products/products.service';
import { ActivatedRoute } from '@angular/router';
import { CardComponent } from '../../../../../shared/components/CardComponent/card/card.component';
import { IProduct } from '../../../../../core/interfaces/iproduct.interface';

@Component({
  selector: 'app-category-products',
  imports: [CardComponent],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.css',
})
export class CategoryProductsComponent implements OnInit {
  private readonly _ProductsService = inject(ProductsService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);

  categoryName: string = '';
  categoryId!: string;
  products!: IProduct[];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('c_id')!;
      },
    });
    this.getSingleCategory(this.categoryId);
  }
  getSingleCategory(categoryId: string) {
    this._ProductsService.getAllProducts(1, categoryId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.results != 0) {
          this.categoryName = res.data[0].category.name;
          this.products = res.data;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
