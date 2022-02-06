import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ShoppingCartService } from 'src/app/shared/components/services/shopping-cart.service';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'app-products',
  template: `
  <section class="products">
    <app-product (addToCartClick)="addTocart($event)" [product] = "product" *ngFor="let product of products"></app-product>
</section>
  `,
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: Product[];

  constructor(private productSvc: ProductsService,private shoppingCartSvc: ShoppingCartService) { }

  ngOnInit(): void {
    this.productSvc.getProducts()
      .pipe(
        tap((products: Product[]) => this.products = products))
      .subscribe();
  }


    // Event triggered when the user clicks in buy h
  addTocart(product:Product):void {
    this.shoppingCartSvc.updateCart(product);
  }


}
