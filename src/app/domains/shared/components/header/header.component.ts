import { Component, Input, signal } from '@angular/core';
import { Product } from '../../models/product.mode';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  @Input({ required: true }) cart: Product[] = [];

  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  getTotal() {
    return this.cart.reduce((acc, product) => acc + product.price, 0);
  }
}
