import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IProduct } from '../../../core/interfaces/iproduct.interface';
import { ProductsService } from '../../../shared/services/Products/products.service';
import { SearchPipePipe } from '../../../shared/pipes/search-pipe-pipe';
import { FormsModule } from '@angular/forms';
import { CardComponent } from "../../../shared/components/CardComponent/card/card.component";

@Component({
  selector: 'app-products',
  imports: [RouterLink, SearchPipePipe, FormsModule, CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  constructor(private _ProductsService: ProductsService) {}
  products: IProduct[] = [];
  pageNumber: number = 1;
  numberOfPages!: number;


  searchInput:string = ''
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(pageNumber: number = 1): void {
    this._ProductsService.getAllProducts(pageNumber).subscribe({
      next: (res) => {
        pageNumber = res.metadata.currentPage;
        this.numberOfPages = res.metadata.numberOfPages;
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  nextBtn() {
    if (this.pageNumber < this.numberOfPages) {
      this.pageNumber++;
      this.getAllProducts(this.pageNumber);
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  prevBtn() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getAllProducts(this.pageNumber);
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    }
  }
}
