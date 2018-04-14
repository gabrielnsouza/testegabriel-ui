import { ToastyService } from 'ng2-toasty';
import { AlunoService } from './../aluno.service';
import { FormControl } from '@angular/forms';
import { Aluno } from './../../model/AlunoModel';
import { Component, OnInit } from '@angular/core';
import { CursoService } from './../../cursos/curso.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aluno-cadastro',
  templateUrl: './aluno-cadastro.component.html',
  styleUrls: ['./aluno-cadastro.component.css']
})
export class AlunoCadastroComponent implements OnInit {

  cursos = [];
    status = [
    { label: 'MATRICULADO', value: 'MATRICULADO'},
    { label: 'TRANCADO', value: 'TRANCADO'},
    { label: 'JUBILADO', value: 'JUBILADO'}
  ];
  aluno = new Aluno();

  constructor(private cursoService: CursoService,
              private alunoService: AlunoService,
              private toasty: ToastyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idAluno = this.route.snapshot.params['id'];
    if (idAluno) {
      this.carregarAluno(idAluno);
    }

    this.carregarCursos();
  }

  carregarAluno(id: number) {
    this.alunoService.buscarPorId(id)
    .then(aluno => {
      this.aluno = aluno;
    });
  }

  get editando() {
    return Boolean(this.aluno.id);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarAluno(form);
    } else {
      this.adicionarAluno(form);
    }
  }

  adicionarAluno(form: FormControl) {
    this.alunoService.adicionar(this.aluno)
    .then(() => {
      this.toasty.success('Aluno cadastrado com sucesso!');
      form.reset();
      this.aluno = new Aluno();
    });
  }

  atualizarAluno(form: FormControl) {
    this.alunoService.atualizar(this.aluno)
    .then(aluno => {
      this.aluno = aluno;
      this.toasty.success('Aluno editado com sucesso!');
    });
  }

  carregarCursos() {
    return this.cursoService.listarTodos()
    .then(cursos => {
      this.cursos = cursos.map(c => {
        return {label: c.nomeCurso, value: c.id};
      });
    });
  }

}
