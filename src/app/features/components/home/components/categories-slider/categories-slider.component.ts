import { Component } from '@angular/core';
import { CategoriesService } from '../../../../../shared/services/Categories/categories.service';
import { ICategories } from '../../../../../core/interfaces/icategories.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-categories-slider',
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css',
})
export class CategoriesSliderComponent {
  constructor(private _CategoriesService: CategoriesService) {}

  categories!: ICategories[];

  logCategory(category: string): void {
    console.log(category);
  }
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      },
      error: (err) => {
        alert(err);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    autoplay: true,
    margin: 20,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplaySpeed: 500,
    lazyLoad: true,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };
}
