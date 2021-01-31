import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { ProfessorComponent } from './professor/professor.component'
import { InclusaoComponent } from './professor/inclusao/inclusao.component'
import { AlteracaoComponent } from './professor/alteracao/alteracao.component'
import { ExclusaoComponent } from './professor/exclusao/exclusao.component'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'professor', component: ProfessorComponent },
  {path: 'cadastro-professor', component: InclusaoComponent },
  {path: 'alteracao-professor', component: AlteracaoComponent },
  {path: 'exclusao-professor', component: ExclusaoComponent },
  {path: '', redirectTo: '/professor', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
