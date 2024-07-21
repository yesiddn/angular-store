import { Component, inject, signal } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.mode';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@shared/components/header/header.component';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  products = signal<Product[]>([]);
  // cart = signal<Product[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  // constructor() {
  //   const initProducts: Product[] = [
  //     {
  //       id: Date.now(),
  //       title: 'Producto 1',
  //       price: 100,
  //       image: 'https://picsum.photos/640/480?r=1',
  //       createdAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 2',
  //       price: 200,
  //       image: 'https://picsum.photos/640/480?r=12',
  //       createdAt: new Date().toISOString()
  //     },
  //     {
  //       id: Date.now(),
  //       title: 'Producto 3',
  //       price: 300,
  //       image: 'https://picsum.photos/640/480?r=123',
  //       createdAt: new Date().toISOString()
  //     }
  //   ];

  //   this.products.set(initProducts);
  // }

  // desde el padre se crea un metodo que recibe un evento del hijo
  // fromChild(event: string) {
  //   console.log('Estamos en el padre:', event);
  // }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe({
        next: (products) => {
          this.products.set(products);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }

  addToCart(product: Product) {
    // this.cart.update(prevState => [...prevState, product]);
    this.cartService.addProduct(product);
  }
}
