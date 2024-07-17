import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />',
  // cuando el template es muy simple, se puede usar la propiedad template en lugar de templateUrl y pasarle el router-outlet, tambien se pueden eliminar los archivos app.component.html y app.component.css
})
export class AppComponent {
  title = 'angular-store';
}
