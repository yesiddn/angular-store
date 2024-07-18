# AngularStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Angular DevTools

Angular DevTools is a Chrome DevTools extension for debugging Angular applications. It is available for Chrome and Firefox and is a part of the Angular Ecosystem.

## Life Cycle Components

- Constructor: Se usa para inyectar dependencias y para inicializar propiedades. NO DEBE SER ASINCRONO. Before render.
- ngOnChanges: Before and during render. Cada vez que cambia un input se ejecuta. Recibe un parametro de tipo SimpleChanges que contiene los cambios se han producido. SimpleChange tiene la siguiente estructura:

```javascript
propetyChanged: SimpleChange {
  currentValue: 1000
  firstChange: false
  previousValue: undefined
}
```

- ngOnInit: After render. Se ejecuta una vez que se ha renderizado el componente. Se usa para inicializar propiedades usando async/await, then, subscribe, etc. Es común usarlo para hacer peticiones HTTP. Se usa mas que el constructor.
- ngDoCheck
  - ngAfterContentInit
  - ngAfterContentChecked
  - ngAfterViewInit: After render. Se ejecuta despues de ngOnInit. Indica si los hijos del componente ya han sido renderizados.
  - ngAfterViewChecked
- ngOnDestroy: Se destruye el componente. Se ejecuta cuando por ejemplo a un componente se le hace un *ngIf="false".
