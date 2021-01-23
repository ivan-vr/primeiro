import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticacaoService } from '../services/autenticacao.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private autenticacao: AutenticacaoService
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

      if (this.autenticacao.autenticado()) {
        console.log('Autenticou !!')
      }
  
  
    }
    ).catch (err => {
      console.log('Erro de autenticação: ', err)
    })

  }

}
