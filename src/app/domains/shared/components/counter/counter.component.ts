import { Component, Input, signal, SimpleChanges } from '@angular/core';

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
  counter = signal(0);
  
  // se crea una referencia para el setInterval
  counterRef: number | undefined;

  // el constructor se usa para crear valores por defecto por lo que no debe ser async
  constructor() {
    console.log('Constructor');
    console.log('-'.repeat(10));
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges');
    console.log(changes);

    const duration = changes['duration'];
    if (duration && duration.currentValue !== duration.previousValue) {
      console.log('duration ->', duration);
      this.doSomething();
    }
    console.log('-'.repeat(10));
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log('duration ->', this.duration);
    console.log('message ->', this.message);
    console.log('-'.repeat(10));

    // el setInterval se ejecuta en el event loop y por ende al destruir el componente no se detiene porque nadie lo detiene -> puede ocurrir con un setInterval, socker de realtime, etc., lo que puede causar memory leaks
    // para evitar memory leaks se debe crear una referencia al setInterval y limpiarla en el ngOnDestroy con el metodo que nos proporciona el browser window.clearInterval(ref)
    this.counterRef = window.setInterval(() => {
      console.log('run interval');

      this.counter.update(prevState => prevState + 1);
    }, 1000);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    console.log('-'.repeat(10));
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    console.log('-'.repeat(10));

    window.clearInterval(this.counterRef);
  }

  doSomething() {
    console.log('Change duration');
    // async/await
  }
}
