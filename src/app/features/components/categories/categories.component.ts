import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/Categories/categories.service';
import { ICategories } from '../../../core/interfaces/icategories.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriesService: CategoriesService) {}

  categories!: ICategories[];

  searchInput: string = '';

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(this.categories);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
