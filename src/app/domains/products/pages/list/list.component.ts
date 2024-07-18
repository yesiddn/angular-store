import { Component } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  // desde el padre se crea un metodo que recibe un evento del hijo
  fromChild(event: string) {
    console.log('Estamos en el padre:', event);
  }
}
