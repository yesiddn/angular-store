import { Routes } from '@angular/router';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component';
import { AboutComponent } from './domains/info/pages/about/about.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./domains/products/pages/list/list.component').then(m => m.ListComponent)
      },
      {
        // con :id se indica que es un parámetro como en Express
        path: 'product/:id',
        component: ProductDetailComponent
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
