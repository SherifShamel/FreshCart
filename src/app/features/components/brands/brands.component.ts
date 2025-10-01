import { Component, OnInit } from '@angular/core';
import { BrandsServiceService } from '../../../shared/services/Brands/brands-service.service';
import { IBrandsInterface } from '../../../core/interfaces/ibrands-interface.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  constructor(private _BrandsServiceService: BrandsServiceService) {}
  brands!: IBrandsInterface[];

  ngOnInit(): void {
    this._BrandsServiceService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
