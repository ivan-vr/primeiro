import { Injectable } from "@angular/core";
import { Professor } from '../shared/professor.model'
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable()
export class ProfessorService {
    
    constructor(
        private afDatabase: AngularFireDatabase
    ) { }


    public cadastrar(professor: Professor): number {

        console.log('ProfessorService - cadastrar - Entrou')

        let id: number = 0
        let matr: string = professor.matricula

        this.afDatabase.database.ref(`professores/${btoa(matr)}`)
            .set( professor )
            .then( (resp: any) => {

                console.log('ProfessorService - cadastrar - Entrou then: ', resp)
  
                id = 0
      
            })
            .catch (err => {

                console.log('ProfessorService - cadastrar - Erro cadastro professor: ' + err)
                id =  0
            })
            return id
    }
  

    public listaProfessores(): Professor[] {

        let matr = "12345"

        let profs: Professor[] = []

        this.afDatabase.database.ref(`professores`)
        .once('value')
        .then((snapshot) => {

            snapshot.forEach((childSnapshot: any) => {
    
                let elem = childSnapshot.val()

                let prof = new Professor() 

                prof.id = childSnapshot.key
                prof.matricula = elem.matricula
                prof.nome = elem.nome
                prof.userId = elem.userId
                prof.dataMatricula = elem.dataMatricula
                prof.formacao = elem.formacao
                prof.maiorTitulo = elem.maiorTitulo

                profs.push(prof)

            })


        })
        .catch((err: any) => {
            console.log('ProfessorService - listaProfessores - Erro na busca: ' + err)
            
        })

        return profs

    }

    // public getALl(): Promise<Professor[]> {
    //     //efetuar uma requisição http
    //     return [];

    //     return this.http.get(`${URL_API}/ofertas?destaque=true`)
    //     .toPromise()
    //     .then((resposta: any) => resposta)

    //     //retornar uma promise Oferta
    // }


}
