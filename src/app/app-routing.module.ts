import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { ProfessorComponent } from './professor/professor.component'

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'professor', component: ProfessorComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}

//  this.router.navigate (['/home'])

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
