import { TemaService } from './../../service/tema.service';
import { PostagemService } from './../../service/postagem.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Postagem } from './../../model/Postagem';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
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

    this.idPost = this.route.snapshot.params['id']
    this.findPostagemById(this.idPost)
  }

  findPostagemById(id: number) {
    this.postagemService.getPostagemById(id).subscribe((resp: Postagem)=>{
      this.postagem = resp
    })
  }

  apagar(){
    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
      alert("Postagem apagada!")
      this.router.navigate(['/home']);
    })
  }
  sair(){
    this.router.navigate(['/home']);
  }

}
