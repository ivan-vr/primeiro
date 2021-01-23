import { Component } from '@angular/core';
import { AutenticacaoService } from './services/autenticacao.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'primeiro';

  constructor (
    private autenticacao: AutenticacaoService,
    private router: Router
  ) {

    if (this.autenticacao.autenticado()) {
      this.router.navigate (['/professor'])
    } else {
      this.router.navigate (['/login'])

    }

  }
}
