import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service'
import { Router } from '@angular/router'
import { Professor } from '../shared/professor.model'
import { ProfessorService } from './professor.service'

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {

  public professores: Professor[] = []

  constructor(
    private autenticacao: AutenticacaoService,
    private router: Router,
    private profService: ProfessorService
  ) { }

  public formul: FormGroup = new FormGroup({
    'escolha': new FormControl(null)
  })

  ngOnInit(): void {

    if (!this.autenticacao.autenticado()) {
      this.router.navigate (['/login'])
    }

    this.listaProfessores()

  }

  public listaProfessores(): void {

    this.professores = this.profService.listaProfessores()
  }


  public cadastrarProfessor(): void {

      this.router.navigate (['/cadastro-professor'])
  }


  public alterarProfessor() : void {

    let id: string = this.formul.controls['escolha'].value

    this.professores.forEach((profe: Professor)  => {

      if (profe.id == id) {

        sessionStorage.setItem(id, profe.matricula)

      } 

    })

    let queryStr = { 
      queryParams: { 
        id: id 
      } 
    }
    this.router.navigate (['/alteracao-professor'], queryStr)
  }

  public excluirProfessor() : void {

    let id: string = this.formul.controls['escolha'].value

    this.professores.forEach((profe: Professor)  => {

      if (profe.id == id) {
        sessionStorage.setItem(id, profe.matricula)
      } 

    })

    let queryStr = { 
      queryParams: { 
        id: id 
      } 
    }
    this.router.navigate (['/exclusao-professor'], queryStr)
  }

}
