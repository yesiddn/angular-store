import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../../shared/models/product.mode';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  // img = `https://picsum.photos/640/640?r=${Math.random()}`;
  // Para tener inputs, es decir, propiedades que se pueden pasar desde el padre al hijo se hace con el decorador @Input()
  // @Input({required: true}) img: string = ''; // Se inicializa con un valor por defecto y se pide que sea requerido
  // @Input({required: true}) title: string = '';
  // @Input({required: true}) price: number = 0;

  @Input({required: true}) product!: Product;

  // se debe crear un evento para que el hijo pueda comunicarse con el padre
  @Output() addToCart = new EventEmitter();

  // al hacer click en el botón se ejecuta este método que emite un evento al padre
  addToCartHandler() {
    // console.log('Estamos en el hijo');

    // this.addToCart.emit(`Hola, este es un mensaje desde el producto: ${this.product.title}`);
    this.addToCart.emit(this.product);
  }
}
