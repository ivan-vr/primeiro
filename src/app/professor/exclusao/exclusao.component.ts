import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Professor } from '../../shared/professor.model'
import { ProfessorService } from '../professor.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exclusao',
  templateUrl: './exclusao.component.html'
})
export class ExclusaoComponent implements OnInit {

  public idProf: string = ''

  constructor(
    private profService: ProfessorService,
    private router: Router,
    private route: ActivatedRoute
  ) { 

    this.route.queryParams.subscribe(params => {
        this.idProf = params['id'];
    })

  }

  public formul: FormGroup = new FormGroup({
    'matricula': new FormControl({value: '', disabled: true}),
    'nome': new FormControl({value: '', disabled: true}),
    'data-contratacao': new FormControl({value: '', disabled: true}),
    'userid': new FormControl({value: '', disabled: true}),
    'formacao': new FormControl({value: '', disabled: true}),
    'maior-titulo': new FormControl({value: '', disabled: true})
  })

  ngOnInit(): void {

    this.carregarCampos()

  }

  public excluir(): void {

    this.profService.excluiProfessor(this.idProf)
    .then ((data: any) => {
        console.log('Dados: ', data)

    })
    .catch ((err: any) => {
        console.log(err)
    })

    this.router.navigate (['/professor'])


  }

  public voltar(): void {
    this.router.navigate(['/professor'])

  }

  public carregarCampos(): void {

    let matric = sessionStorage.getItem(this.idProf)

    sessionStorage.removeItem(this.idProf)

    let prof: Professor = new Professor()
    prof.matricula = matric

    this.profService.buscaProfessor(this.idProf)
    .then((profes) => {
      prof = profes

      this.formul.setValue({
        'matricula': prof.matricula,
        'nome': prof.nome,
        'userid': prof.userId,
        'data-contratacao': prof.dataMatricula,
        'formacao': prof.formacao,
        'maior-titulo': prof.maiorTitulo
      })
    }).catch((err) => {
      console.log(err)
    })

  }


}
