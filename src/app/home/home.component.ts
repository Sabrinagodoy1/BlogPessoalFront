import { AuthService } from './../service/auth.service';
import { PostagemService } from './../service/postagem.service';
import { TemaService } from './../service/tema.service';
import { User } from './../model/User';
import { Tema } from './../model/Tema';
import { Postagem } from './../model/Postagem';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagem: Postagem[];

  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;

  usuario: User = new User();
  idUser = environment.id;

  constructor(
    private router: Router,
    private temaService: TemaService,
    private postagemService: PostagemService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    window.scroll(0,0)
    if (environment.token == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sua sessão expirou, faça o login novamente.',
      })
      this.router.navigate(['/entrar']);
    }

    this.findAllPostagens();
    this.findAllTemas();
  }

  findAllPostagens() {
    this.postagemService.getAllPostagem().subscribe((resp: Postagem[]) => {
      this.listaPostagem = resp;
    });
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findTemaById() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findUserById() {
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.usuario = resp;
    });
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema
    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      Swal.fire({
        icon: 'success',
        title: 'Postado com sucesso',
      
      })
      this.postagem = new Postagem()
      this.findAllPostagens()
    })
  }

}
