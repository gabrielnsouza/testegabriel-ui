import { Curso } from './../model/CursoModel';
import { Injectable } from '@angular/core';
import { ToastyService } from 'ng2-toasty';

import { Http, Response, URLSearchParams, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

export interface CursoFiltro {
  nomeCurso: string;
}

@Injectable()
export class CursoService {
  cursosUrl = 'http://localhost:8086/cursos/';

  constructor(private http: Http, private toasty: ToastyService) {}

  pesquisar(filtro: CursoFiltro): Promise<any> {
    const param = new URLSearchParams();

    if (filtro.nomeCurso) {
      param.set('nomeCurso', filtro.nomeCurso);
    }

    return this.http.get(`${this.cursosUrl}/pesquisar`,
     {search: param})
    .toPromise()
    .then(response => response.json());
  }

  listarTodos(): Promise<any> {
    return this.http.get(`${this.cursosUrl}`)
    .toPromise()
    .then(response => response.json());
  }

  excluir(codigo: number): Promise<void> {
    return this.http.delete(`${this.cursosUrl}${codigo}`)
    .toPromise()
    .then(() => null);
  }

  adicionar(curso: Curso): Promise<Curso> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post(this.cursosUrl,
      JSON.stringify(curso), {headers})
      .toPromise()
      .then(response => response.json());
  }

  atualizar(curso: Curso): Promise<Curso> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.cursosUrl}${curso.id}`,
        JSON.stringify(curso), { headers })
      .toPromise()
      .then(response => {
        const cursoAlterado = response.json() as Curso;
        return cursoAlterado;
      });
  }

  buscarPorId(id: number): Promise<Curso> {
    return this.http.get(`${this.cursosUrl}${id}`)
      .toPromise()
      .then(response => {
        const curso = response.json() as Curso;
        return curso;
      });
  }

}
