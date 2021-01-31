import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Professor } from '../../shared/professor.model'
import { ProfessorService } from '../professor.service'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alteracao',
  templateUrl: './alteracao.component.html',
  styleUrls: ['./alteracao.component.css']
})
export class AlteracaoComponent implements OnInit {

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
    'matricula': new FormControl(null,
      [Validators.required, Validators.minLength(4), Validators.maxLength(7)]
    ),
    'nome': new FormControl(null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    ),
    'data-contratacao': new FormControl(null,
      [Validators.required, Validators.minLength(10), Validators.maxLength(10)]
    ),
    'userid': new FormControl(null,
      [Validators.required, Validators.minLength(5), Validators.maxLength(8)]
    ),
    'formacao': new FormControl(null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    ),
    'maior-titulo': new FormControl(null,
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)]
    )
  })

  ngOnInit(): void {

    this.carregarCampos()

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
