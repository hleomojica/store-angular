import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { delay, switchMap, tap } from 'rxjs';
import { Details, Order } from 'src/app/shared/components/interfaces/order.interface';
import { Store } from 'src/app/shared/components/interfaces/stores.interface';
import { DataService } from 'src/app/shared/components/services/data.service';
import { ShoppingCartService } from 'src/app/shared/components/services/shopping-cart.service';
import { Product } from '../products/interfaces/product.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  model = {
    name: '',
    store: '',
    shippingAddress: '',
    city: '',
  }
  isDelivery = true;
  stores: Store[] = [];
  cart: Product[] = [];

  constructor(
    private dataSvc: DataService, 
    private shoppingCartSvc: ShoppingCartService,
    private router : Router) { }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
  }

  onPickupOrDelivery(value: boolean): void {
    this.isDelivery = value;
    console.log(this.isDelivery);
  }

  onSubmit({ value: formData }: NgForm): void {

    const data: Order = {
      ...formData,
      date: this.getCurrentDay(),
      isDelivery: this.isDelivery
    }
    this.dataSvc.saveOrder(data)
      .pipe(
        tap(result => console.log(result)),
        switchMap(({id:orderId}) => {
          const details = this.prepareDetails();
          return this.dataSvc.saveDetailsOrder({ details, orderId });
        }),
        tap(res => this.router.navigate(['/checkout/thank-you-page'])),
        delay(2000),
        tap( res => this.shoppingCartSvc.resetCart())
      )
      .subscribe();

  }


  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product: Product) => {
      // Destructuring 
      const { id: productId, name: productName, qty: quantity, stock } = product;

      details.push({ productId, productName, quantity });

    })
    return details;
  }

  private getDataCart(): void {
    this.shoppingCartSvc.cartAction$
      .pipe(
        tap((products: Product[]) => this.cart = products))
      .subscribe();
  }

  getStores(): void {
    // Todo : How to subscribe to an observable
    this.dataSvc.getStores()
      .pipe(tap((stores: Store[]) => this.stores = stores))
      .subscribe()
  }

  private getCurrentDay(): string {
    return new Date().toLocaleDateString();
  }

}
