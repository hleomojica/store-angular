import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar color="primary">
    <a [routerLink]="['/']">
      
      <span>
      HM Online
      </span>
    </a>

    <span class="spacer">
    </span>
  <app-cart class="mat-icon_s" (click)="goToCheckout()"></app-cart>
  
    
</mat-toolbar>`,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private router: Router) { }

  goToCheckout() {
    this.router.navigate(['/checkout']);
  }
}
