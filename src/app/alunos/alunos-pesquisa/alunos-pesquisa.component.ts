import { CursoService } from './../../cursos/curso.service';
import { Curso } from './../../model/CursoModel';
import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { AlunoService } from './../aluno.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-alunos-pesquisa',
  templateUrl: './alunos-pesquisa.component.html',
  styleUrls: ['./alunos-pesquisa.component.css']
})
export class AlunosPesquisaComponent {

  nomeAluno: string;
  alunos = [];
  cursos = [];

  constructor(private alunoService: AlunoService,
              private cursoService: CursoService,
              private toasty: ToastyService,
              private confirmation: ConfirmationService) {}

  ngOnInit() {
    console.log(this.alunoService.buscarPorId(15));
    this.carregarCursos();
    this.pesquisar();
  }

  pesquisar() {
    this.alunoService.pesquisar({ nomeAluno: this.nomeAluno })
    .then(alunos => this.alunos = alunos);
  }

  carregarCursos() {
    return this.cursoService.listarTodos()
    .then(cursos => {
      this.cursos = cursos.map(c => {
        return {label: c.nomeCurso, value: c.id};
      });
    });
  }

  confirmarExclusao(aluno: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja exlcuir?',
      accept: () => {
        this.excluir(aluno);
      }
    });
  }

  excluir(curso: any) {
    this.alunoService.excluir(curso.id)
    .then(() => {
      this.pesquisar();
      this.toasty.success('Aluno excluido com sucesso!');
    });
  }

}
