import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ɵInternalFormsSharedModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersServiceService } from '../../../../shared/services/Orders/orders-service.service';

@Component({
  selector: 'app-checkout-component',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './checkout-component.component.html',
  styleUrl: './checkout-component.component.css',
})
export class CheckoutComponentComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersServiceService = inject(OrdersServiceService);

  cartId!: string;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (param) => {
        console.log(param.get('c_id'));
        this.cartId = param.get('c_id')!;
      },
    });
  }

  myForm: FormGroup = new FormGroup({
    details: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
  });

  checkOut() {
    if (this.myForm.valid) {
      console.log(this.myForm);
      this._OrdersServiceService.CheckoutSession(this.cartId, this.myForm.value).subscribe({
        next: (res) => {
          console.log(res);
          window.open(res.session.url);
        },
      });
    }
  }
}
