import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard }  from "./guards/auth.guard";
import { NologinGuard }  from "./guards/nologin.guard";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'login', loadChildren: './componentes/login/login.module#LoginPageModule', canActivate : [NologinGuard] },
  { path: 'registro', loadChildren: './componentes/registro/registro.module#RegistroPageModule', canActivate : [NologinGuard] },
  { path: 'inicio', loadChildren: './pages/inicio/inicio.module#InicioPageModule', canActivate : [AuthGuard] },
  { path: 'novillac', loadChildren: './pages/novillac/novillac.module#NovillacPageModule' },
  { path: 'novillar', loadChildren: './pages/novillar/novillar.module#NovillarPageModule' },
  { path: 'vacac', loadChildren: './pages/vacac/vacac.module#VacacPageModule' },
  { path: 'vacar', loadChildren: './pages/vacar/vacar.module#VacarPageModule' },
  { path: 'prosimac', loadChildren: './pages/prosimac/prosimac.module#ProsimacPageModule' },
  { path: 'prosimar', loadChildren: './pages/prosimar/prosimar.module#ProsimarPageModule' },
  { path: 'lecher', loadChildren: './pages/lecher/lecher.module#LecherPageModule' },
  { path: 'lechec', loadChildren: './pages/lechec/lechec.module#LechecPageModule' },
  { path: 'noticias', loadChildren: './pages/noticias/noticias.module#NoticiasPageModule' },
  { path: 'pdf', loadChildren: './pages/pdf/pdf.module#PdfPageModule' },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
