import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Professor } from '../../shared/professor.model'
import { ProfessorService } from '../professor.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-alteracao',
  templateUrl: './alteracao.component.html',
  styleUrls: ['./alteracao.component.css']
})
export class AlteracaoComponent implements OnInit {

  constructor(
    private profService: ProfessorService,
    private router: Router
  ) { }

  public formul: FormGroup = new FormGroup({
    'matricula': new FormControl(null, 
      [Validators.required, Validators.minLength(4),Validators.maxLength(7)]
    ),
    'nome': new FormControl(null, 
      [Validators.required, Validators.minLength(3),Validators.maxLength(100)]
    ),
    'data-contratacao': new FormControl(null, 
      [Validators.required, Validators.minLength(10),Validators.maxLength(10)]
    ),
    'userid': new FormControl(null, 
      [Validators.required, Validators.minLength(5),Validators.maxLength(8)]
    ),
    'formacao': new FormControl(null, 
      [Validators.required, Validators.minLength(3),Validators.maxLength(100)]
    ),
    'maior-titulo': new FormControl(null, 
      [Validators.required, Validators.minLength(3),Validators.maxLength(100)]
    )
  })

  ngOnInit(): void {

    

  }

  public alterar(): void {

    let professor: Professor = new Professor()

    professor.matricula = this.formul.controls['matricula'].value
    professor.nome = this.formul.controls['nome'].value
    professor.userId = this.formul.controls['userid'].value
    professor.dataMatricula = this.formul.controls['data-contratacao'].value
    professor.formacao = this.formul.controls['formacao'].value
    professor.maiorTitulo = this.formul.controls['maior-titulo'].value

    let chave: number = this.profService.cadastrar(professor)

    console.log('InclusaoComponent - cadastrar - Chave : ', chave)

  }

  public voltar() : void {
    this.router.navigate (['/professor'])

  }

}
