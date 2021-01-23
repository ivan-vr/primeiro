import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacaoService } from '../services/autenticacao.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public isErroLogin: boolean = false
  public mensagemErroLogin: string = ''

  constructor(
    private autenticacao: AutenticacaoService,
    private router: Router
  ) { }

  public formul: FormGroup = new FormGroup({
    'email': new FormControl(
      null, 
      [Validators.required, Validators.minLength(3),Validators.maxLength(120)]
    ),
    'senha': new FormControl(      
      null, 
      [Validators.required, Validators.minLength(6),Validators.maxLength(20)]
    )
  })


  ngOnInit(): void {
  }

  public autenticar(): void {
    
    let email: string = this.formul.controls['email'].value
    let senha: string = this.formul.controls['senha'].value

    // let email: string = 'ivanmartins@meusite.com.br'
    // let senha: string = 'ivanmartins'

    this.autenticacao.autenticarUsuario(email, senha)
    .then(result => {

      this.isErroLogin = this.autenticacao.isErro()
      this.mensagemErroLogin = this.autenticacao.getMensagemErro()

      if (!this.isErroLogin) {

        this.router.navigate (['/professor'])
      }

    })

  }


  public formValido (): string {

    return  (this.formul.valid ? '' : 'disabled')
    
  }

}
