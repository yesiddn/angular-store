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

## Prop drilling o input drilling

El Prop Drilling es una paso del desarrollo que ocurre cuando necesitamos obtener datos que están en varias capas en el árbol de componentes.
Por ejemplo, separan el [Cart Sidebar](./src/app/domains/shared/components/header/header.component.html) del [Header](./src/app/domains/shared/components/cart-sidebar/cart-sidebar.component.html), generando asi 3 niveles con el [Product List](./src/app/domains/products/pages/list/list.component.html). La solución a este problema es implementar un Store o suscripción a un servicio para que los componentes puedan obtener los datos que necesitan sin tener que pasar por todos los componentes.

### Create a sevice

```bash
ng generate service domains/shared/services/cart
```

Los servicios son encargados de manejar datos y lógica de negocio. Generalmente se usan para hacer peticiones HTTP.

## Pipes

Los pipes son funciones que se usan para transformar datos. Angular tiene varios pipes integrados como el DatePipe, UpperCasePipe, LowerCasePipe, etc. También se pueden crear pipes personalizados.
Generalmente se usan para transformar datos en la vista usando el pipe operator "|" después de la variable y antes del pipe.

```html
<p>{{ product.title | uppercase }}</p>
<p>{{ product.price | currency }}</p>
<p>{{ product.price | currency:'$' }}</p>
<!-- Precicion decimal de 0 -->
<p>{{ product.price | currency:'$':'symbol':'1.0' }}</p>
<!-- Precicion decimal de 3 -->
<p>{{ product.price | currency:'$':'symbol':'1.3' }}</p>
<!-- Pipe de fecha -->
<p>{{ product.date | date:'short' }}</p>
```

Para saber más sobre los pipes integrados de Angular, visita la [documentación oficial](https://angular.io/api?type=pipe).

### Create a pipe

```bash
ng generate pipe domains/shared/pipes/reverse
```

Los pipes tienen el decorador @Pipe como un componente tiene el decorador @Component. Un pipe puro es un pipe que no tiene efectos secundarios y que siempre devuelve el mismo resultado para la misma entrada. Un pipe impuro es un pipe que tiene efectos secundarios y que puede devolver un resultado diferente para la misma entrada.

```javascript
export class TimeAgoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
```

`transform` es el método que se ejecuta cuando se usa el pipe en la vista. Recibe un valor y argumentos y devuelve un valor transformado.

Para usar el pipe en la vista, se debe importar el pipe en el módulo donde se va a usar y agregarlo a la lista de declaraciones como se hacizo con el pipe de currency.
Cabe aclarar que los pipes de Angular ya vienen en el CommonModule, pero si no se ha importado el CommonModule en el módulo donde se va a usar el pipe, se puede importar el pipe por separado.

## Directives

```bash
ng generate directive domains/shared/directives/highlight
```

Las directivas son clases que se usan para manipular el DOM. Angular tiene varias directivas integradas como el NgIf, NgFor, NgClass, etc. También se pueden crear directivas personalizadas.

## Layout or nested views

Se crea un componente como si fuese un componente normal.

```bash
ng g c domains/shared/components/layout
```

La unica diferencia es que en `layout.component.html` se debe agregar un `<router-outlet />` para que los componentes hijos se rendericen en ese lugar.

```html
<div class="container mx-auto">
  <app-header />
  <router-outlet />
</div>
```

Y en `app.routes.ts` se debe agregar el componente como si fuese una ruta normal, pero además se debe agregar la propiedad `children` con las rutas hijas que vayan necesitar el layout.

```javascript
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
```

## Lazy loading y code splitting

Lazy loading es una técnica que se usa para cargar módulos de forma asíncrona. Se usa para mejorar el rendimiento de la aplicación y para reducir el tiempo de carga inicial. Se puede usar para cargar módulos enteros o componentes específicos.
Nos conviene que en la primera carga de la página al usuario, no descarguemos todo el peso de nuestra app completa.

Con el code splitting, podemos dividir nuestra app en varios paquetes o chunks y cargar solo los paquetes que necesitamos.

### BENEFICIOS

- Ya no descargamos la app completa, sino solo lo necesario a la ruta
- La mayoría de usuarios no visita cada una de las rutas, ¿para qué traerlas todas?
- Reducimos considerablemente el tiempo de carga de nuestra app, dependiendo el tamaño de nuestra página
- Por otro lado, también favorece el lado de seguridad. Por ejemplo:
Si contamos con una ruta /admin, al que solo pueden ingresar usuarios con el rol de Supervisor, ¿estaría bien si la ruta /admin les cargue a todos así no puedan ingresar?
Utilizando el lazy loading, evitamos que tampoco te carguen rutas de las que no deberías tener conocimiento

### Aplicando lazy loading

En el archivo `app.routes.ts` se debe importar el módulo que se va a cargar de forma asíncrona usando la propiedad `loadComponet` en lugar de `component`.

```javascript
{
  path: '',
  loadComponent: () => import('./domains/products/pages/list/list.component').then(m => m.ListComponent)
},
```

`loadComponent` ahora recibe una funcion que por medio de `import` carga el módulo de forma asíncrona por lo que al ser una promesa, se debe usar `then` para obtener el módulo.

Para no tener que usar el `then` en cada ruta, en el modulo que se quiere cargar de forma asíncrona se debe agregar el `default` en la exportación del módulo.

```javascript
export default class ListComponent {}
```

Ya con esto se puede usar el `import` directamente en la propiedad `loadComponent`.

```javascript
{
  path: '',
  loadComponent: () => import('./domains/products/pages/list/list.component')
},
```

## Prefetching

Prefetching es una técnica que se usa para cargar recursos antes de que el usuario los necesite. Se usa para mejorar el rendimiento de la aplicación y para reducir el tiempo de carga de las rutas.

Para usar prefetching en Angular, se debe activar en el archivo `app.config.ts`. Del modulo `@angular/router` se debe importar `withPreloading` y `PreloadAllModules` y agregar `withPreloading(PreloadAllModules)` en la función `provideRouter()`.

```javascript
providers: [
  provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
  provideHttpClient()
]
```

## Migration to Angular new syntax

```bash
ng g @angular/core:control-flow
```

Mostrará la opción de seleccionar la carpeta que se quiere migrar. Se dará enter para seleccionar el proyecto completo.

```bash
? Which path in your project should be migrated? ./
```

Luego, preguntará si se quiere formatear el código de los templates.

```bash
? Should the migration reformat your templates? no
```

> Por lo general, se debe seleccionar `no` para que no se formatee el código de los templates.
