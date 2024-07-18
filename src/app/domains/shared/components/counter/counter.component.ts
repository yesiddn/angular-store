import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  @Input({ required: true }) duration = 0; // el motor de TypeScript infiere el tipo de dato de forma implícita
  @Input({ required: true }) message: string = '';

  // el constructor se usa para crear valores por defecto por lo que no debe ser async
  constructor() {
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes);
    console.log('-'.repeat(10));
  }
}
