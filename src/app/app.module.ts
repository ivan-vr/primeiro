import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AutenticacaoService } from './services/autenticacao.service';
import { AutenticacaoGuard } from './services/autenticacao-guard.service'
import { ProfessorService } from './professor/professor.service'

import { InclusaoComponent } from './professor/inclusao/inclusao.component';
import { AlteracaoComponent } from './professor/alteracao/alteracao.component';
import { ConsultaComponent } from './professor/consulta/consulta.component';
import { ProfessorComponent } from './professor/professor.component';
import { AcessoComponent } from './acesso/acesso.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InclusaoComponent,
    AlteracaoComponent,
    ConsultaComponent,
    ProfessorComponent,
    AcessoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
    , AngularFireDatabaseModule
  ],
  providers: [ AutenticacaoService, AutenticacaoGuard, ProfessorService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
