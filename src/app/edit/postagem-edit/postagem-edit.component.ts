import { TemaService } from './../../service/tema.service';
import { Tema } from './../../model/Tema';
import { PostagemService } from './../../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagem } from './../../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema:number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) { }

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
    window.scroll(0,0)

    let id = this.route.snapshot.params['id']
    this.findPostagemById(id)
    this.findAllTemas()
  }

  findPostagemById(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  findTemaById() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  atualizar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp
      alert('Postagem atualizada com sucesso!')
      this.router.navigate(['/home'])
    })
  }

}
