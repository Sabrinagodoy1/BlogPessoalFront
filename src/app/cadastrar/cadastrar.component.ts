import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any) {

    this.confirmarSenha = event.target.value

  }

  typeUser(event: any) {

    this.tipoUsuario = event.target.value

  }

  cadastrar() {

    this.user.tipo = this.tipoUsuario
    if (this.user.senha != this.confirmarSenha) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As senhas não coincidem',
      })
    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/entrar'])
        Swal.fire(
          'Cadastro Realizado Com Sucesso!',
          'Acesse sua conta na próxima página',
          'success'
        )
      })
    }

  }

}
