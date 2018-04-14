import { ToastyService } from 'ng2-toasty';
import { CursoService } from './../curso.service';
import { Curso } from './../../model/CursoModel';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-curso-cadastro',
  templateUrl: './curso-cadastro.component.html',
  styleUrls: ['./curso-cadastro.component.css']
})
export class CursoCadastroComponent implements OnInit {

  curso = new Curso();

  constructor(private cursoService: CursoService,
              private toasty: ToastyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idCurso = this.route.snapshot.params['id'];
    if (idCurso) {
      this.carregarCurso(idCurso);
    }
  }

  carregarCurso(id: number) {
    this.cursoService.buscarPorId(id)
    .then(curso => {
      this.curso = curso;
    });
  }

  get editando() {
    return Boolean(this.curso.id);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarCurso(form);
    } else {
      this.adicionarCurso(form);
    }
  }

  adicionarCurso(form: FormControl) {
    this.cursoService.adicionar(this.curso)
    .then(() => {
      this.toasty.success('Curso cadastrado com sucesso!');
      form.reset();
      this.curso = new Curso();
    });
  }

  atualizarCurso(form: FormControl) {
    this.cursoService.atualizar(this.curso)
    .then(curso => {
      this.curso = curso;
      this.toasty.success('Curso editado com sucesso!');
    });
  }

}
