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
import { InclusaoComponent } from './professor/inclusao/inclusao.component';
import { AlteracaoComponent } from './professor/alteracao/alteracao.component';
import { ConsultaComponent } from './professor/consulta/consulta.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InclusaoComponent,
    AlteracaoComponent,
    ConsultaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
    , AngularFireDatabaseModule
  ],
  providers: [ AutenticacaoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
