import { Curso } from './CursoModel';

export class Aluno {
    id: number;
    nomeAluno: string;
    numeroMatricula: number;
    semestre: number;
    status: string;
    curso = new Curso;
}