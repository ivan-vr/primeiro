import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  // public estadoBanner: string = 'criado'
  // public estadoPainel: string = 'criado'

  public cadastro: boolean = false

  constructor() { }

  ngOnInit(): void {
  }


  public exibirPainelFilho(event: string): void {

    this.cadastro = event == 'cadastro'? true: false

  }

}
