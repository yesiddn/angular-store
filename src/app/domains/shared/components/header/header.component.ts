import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product.mode';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  hideSideMenu = signal(true);
  // @Input({ required: true }) cart: Product[] = []; // ya no es necesario el input porque se usarán los servicios
  private cartService = inject(CartService);
  cart = this.cartService.cart;
  
  // total = signal(0);
  total = this.cartService.total;

  toogleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   const cart = changes['cart'];
  //   if (cart) {
  //     this.total.set(this.getTotal());
  //   }
  // }

  // Llamar a funciones directamente desde el template en Angular puede ser una mala práctica, si esas funciones realizan cálculos o procesamientos pesados y son llamadas frecuentemente, como cada vez que se ejecuta la detección de cambios de Angular. Esto puede llevar a problemas de rendimiento, especialmente si la función se encuentra en una parte del template que se actualiza con mucha frecuencia.
  // getTotal() {
  //   return this.cart.reduce((acc, product) => acc + product.price, 0);
  // }
}
