import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro';
import { ConsultaComponent } from './consulta/consulta';

export const routes: Routes = [
    { path: 'cadastro', component:  CadastroComponent },
    { path: 'consulta', component:  ConsultaComponent },
];
