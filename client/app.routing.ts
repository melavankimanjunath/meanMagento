import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent }     from './category/category.component';
import { HomeComponent }     from './home/home.component';

const app_routes: Routes = [
  { path: '',  component: HomeComponent },
  { path: 'category', component: CategoryComponent }
];

export const app_routing = RouterModule.forRoot(app_routes);