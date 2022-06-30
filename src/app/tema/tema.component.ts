import { Tema } from './../model/Tema';
import { Observable } from 'rxjs';
import { TemaService } from './../service/tema.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css'],
})
export class TemaComponent implements OnInit {
  temas: Tema[];
  novoTema: Tema = new Tema();

  constructor(private router: Router, private temaService: TemaService) {}

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

    this.findAllTema();
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.temas = resp;
    });
  }

  cadastrar() {
    console.log(this.novoTema)
    this.temaService.postTema(this.novoTema).subscribe((resp: Tema) => {
      this.novoTema = resp;
      Swal.fire({
        icon: 'success',
        title: 'Tema cadastrado com sucesso!',
        
      })
      this.findAllTema();
      this.novoTema = new Tema();
    });
  }
}
