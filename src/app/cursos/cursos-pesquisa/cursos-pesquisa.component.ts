import { ConfirmationService } from 'primeng/components/common/api';
import { ToastyService } from 'ng2-toasty';
import { CursoService } from './../curso.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos-pesquisa',
  templateUrl: './cursos-pesquisa.component.html',
  styleUrls: ['./cursos-pesquisa.component.css']
})
export class CursosPesquisaComponent implements OnInit {

  nomeCurso: string;
  cursos = [];

  constructor(private cursoService: CursoService, private toasty: ToastyService, private confirmation: ConfirmationService) {}

  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.cursoService.pesquisar({ nomeCurso: this.nomeCurso })
    .then(cursos => this.cursos = cursos);
  }

  confirmarExclusao(curso: any) {
    this.confirmation.confirm({
      message: 'Tem certeza que deseja exlcuir?',
      accept: () => {
        this.excluir(curso);
      }
    });
  }

  excluir(curso: any) {
    this.cursoService.excluir(curso.id)
    .then(() => {
      this.pesquisar();
      this.toasty.success('Curso excluido com sucesso!');
    })
    .catch(erro => this.toasty.error('Este Curso não pode ser exlcluido, existem alunos matriculados!'));
  }

}
