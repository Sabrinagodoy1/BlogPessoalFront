import { Component, OnInit } from '@angular/core';
import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';
import { User } from './../model/User';

@Component({
  selector: 'app-projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.css']
})
export class ProjetoComponent implements OnInit {

  id = environment.id
  nome = environment.nome
  foto = environment.foto

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
    if (environment.token == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sua sessão expirou, faça o login novamente.',
      })
      this.router.navigate(['/entrar']);
    }
  }

}
