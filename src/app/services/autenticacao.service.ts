import { Injectable } from '@angular/core';
import { AngularFireAuth  } from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private mensagemErro: string = ''
  private erro: boolean = false

  private token_id: string = ''

  constructor(
      private afAuth: AngularFireAuth, // Inject Firebase auth service
      private afDatabase: AngularFireDatabase
  ) {
  }

  ngOnInit() {

  }

  public autenticarUsuario(email: string, senha: string): Promise<any> {

      console.log('>> autenticacao')

      return this.afAuth.signInWithEmailAndPassword(email, senha)
          .then((resposta: any) => {

              this.afAuth.currentUser.then((user: any) => {

                  user.getIdToken().then((itk: any) => {

                      this.token_id = itk

                      localStorage.setItem('idToken',this.token_id)

                  }).catch((err: Error) => {

                      console.log('Erro 1 ---> ' + err)
                      this.erro = true
                      this.mensagemErro = err.message
                  })
              }).catch((err: Error) => {

                  console.log('Erro 2 ---> ' + err)
                  this.erro = true
                  this.mensagemErro = err.message
              })

              this.erro = false
              this.mensagemErro = ''

          })
          .catch((error: Error) => {

              console.log('Erro 3 ---> ' + error)

              this.erro = true
              this.mensagemErro = error.message

          })
  }


  public autenticado(): boolean {

      if (this.token_id === '') {

          let idTokenStorage: string = localStorage.getItem('idToken')

          if (idTokenStorage !== null) {
              this.token_id = idTokenStorage
          }
      }

      // if (this.token_id === '') {
      //     this.router.navigate(['/'])
      // }

      return (this.token_id !== '')

  }

  

}
