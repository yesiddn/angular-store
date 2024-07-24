import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      // withComponentInputBinding() le dice a Angular que los parametros le lleguen a los componentes como inputs
      provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
      provideHttpClient()
    ]
};
