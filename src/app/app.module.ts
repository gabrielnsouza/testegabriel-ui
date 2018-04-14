import { AlunoService } from './alunos/aluno.service';
import { CursoService } from './cursos/curso.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import {ToastyModule} from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';


import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {DataTableModule} from 'primeng/datatable';
import {DropdownModule} from 'primeng/dropdown';


import { AppComponent } from './app.component';
import { CursosPesquisaComponent } from './cursos/cursos-pesquisa/cursos-pesquisa.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AlunosPesquisaComponent } from './alunos/alunos-pesquisa/alunos-pesquisa.component';
import { CursoCadastroComponent } from './cursos/curso-cadastro/curso-cadastro.component';
import { AlunoCadastroComponent } from './alunos/aluno-cadastro/aluno-cadastro.component';

const routes: Routes = [
  { path: 'cursos', component: CursosPesquisaComponent },
  { path: 'curso/:id', component: CursoCadastroComponent },
  { path: 'curso/novo', component: CursoCadastroComponent },
  { path: 'alunos', component: AlunosPesquisaComponent },
  { path: 'aluno/:id', component: AlunoCadastroComponent },
  { path: 'aluno/novo', component: AlunoCadastroComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CursosPesquisaComponent,
    NavbarComponent,
    AlunosPesquisaComponent,
    CursoCadastroComponent,
    AlunoCadastroComponent
  ],
  imports: [
    BrowserModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    DropdownModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes),

    ToastyModule.forRoot(),
    ConfirmDialogModule
  ],
  providers: [CursoService, ConfirmationService, AlunoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
