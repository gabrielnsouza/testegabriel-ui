import { Curso } from './../model/CursoModel';
import { Aluno } from './../model/AlunoModel';
import { Injectable } from '@angular/core';

import { Http, Response, URLSearchParams, Headers } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

export interface AlunoFiltro {
  nomeAluno: string;
}

@Injectable()
export class AlunoService {

  alunosUrl = 'http://localhost:8086/alunos/';

    constructor(private http: Http) {}

    pesquisar(filtro: AlunoFiltro): Promise<any> {
      const param = new URLSearchParams();

      if (filtro.nomeAluno) {
        param.set('nomeAluno', filtro.nomeAluno);
      }

      return this.http.get(`${this.alunosUrl}/pesquisar`,
       {search: param})
      .toPromise()
      .then(response => response.json());
    }

    excluir(codigo: number): Promise<void> {
      return this.http.delete(`${this.alunosUrl}${codigo}`)
      .toPromise()
      .then(() => null);
    }

    adicionar(aluno: Aluno): Promise<Aluno> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.alunosUrl,
        JSON.stringify(aluno), {headers})
        .toPromise()
        .then(response => response.json());
    }

    atualizar(aluno: Aluno): Promise<Aluno> {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.put(`${this.alunosUrl}${aluno.id}`,
          JSON.stringify(aluno), { headers })
        .toPromise()
        .then(response => {
          const alunoAlterado = response.json() as Aluno;
          return alunoAlterado;
        });
    }

    buscarPorId(id: number): Promise<Aluno> {
      return this.http.get(`${this.alunosUrl}${id}`)
        .toPromise()
        .then(response => {
          const aluno = response.json() as Aluno;
          return aluno;
        });
    }
}
