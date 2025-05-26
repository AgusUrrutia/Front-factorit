import { Routes } from '@angular/router';
import { CarritoComponent } from './features/carrito/carrito.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ProductosComponent } from './features/productos/productos.component';
import { RegisterComponent } from './features/register/register.component';
import { ClientesVipComponent } from './features/clientes-vip/clientes-vip.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent },
    {
        path: '',
        component: MainLayoutComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'productos',
            pathMatch: 'full'
          },
          {
            path: 'productos',
            component: ProductosComponent
          },
          {
            path: 'carrito',
            component: CarritoComponent
          },
          {
            path: 'clientes/vip',
            component: ClientesVipComponent
          }
        ]
      },
    { path: '**', redirectTo: 'login' }
];
