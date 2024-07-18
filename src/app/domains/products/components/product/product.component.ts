import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  // img = `https://picsum.photos/640/640?r=${Math.random()}`;
  // Para tener inputs, es decir, propiedades que se pueden pasar desde el padre al hijo se hace con el decorador @Input()
  @Input({required: true}) img: string = ''; // Se inicializa con un valor por defecto y se pide que sea requerido
  @Input({required: true}) title: string = '';
  @Input({required: true}) price: number = 0;
}
