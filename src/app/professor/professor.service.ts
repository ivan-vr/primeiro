import { Injectable } from "@angular/core";
import { Professor } from '../shared/professor.model'
import { AngularFireDatabase } from '@angular/fire/database'

@Injectable()
export class ProfessorService {
    
    constructor(
        private afDatabase: AngularFireDatabase
    ) { }


    public cadastrar(professor: Professor): number {

        let id: number = 0
        let matr: string = professor.matricula

        this.afDatabase.database.ref(`professores/${btoa(matr)}`)
            .set( professor )
            .then( (resp: any) => {

                console.log(resp)
  
                id = 0
      
            })
            .catch ((err:any) => {

                console.log(err)
                id =  0
            })
            return id
    }
  

    public listaProfessores(): Professor[] {

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
            console.log(err)
        })

        return profs

    }

    public buscaProfessor(id: string): Promise<Professor> {

        return new Promise((resolve, reject) => {

            let prof: Professor = new Professor()
    
            this.afDatabase.database.ref(`professores/${id}`)
            .once('value')
            .then((snapshot) => {
    
                let elem = snapshot.val()
    
                prof.id = id
                prof.matricula = elem.matricula
                prof.nome = elem.nome
                prof.userId = elem.userId
                prof.dataMatricula = elem.dataMatricula
                prof.formacao = elem.formacao
                prof.maiorTitulo = elem.maiorTitulo

                resolve(prof)
    
            })
            .catch((err: any) => {
                reject(err)
            })
    
        })    

    }


    public excluiProfessor(id: string): Promise<string> {

        return new Promise((resolve, reject) => {

            let prof: Professor = new Professor()
    
            this.afDatabase.database.ref(`professores/${id}`)
            .remove()
            .then((snapshot) => {

                resolve(id)
    
            })
            .catch((err: any) => {
                reject(err)
            })
    
        })    

    }
}
