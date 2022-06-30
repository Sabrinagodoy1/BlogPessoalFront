
import { environment } from './../../../environments/environment.prod';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../../service/auth.service';
import { User } from './../../model/User';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmarSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
   
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sua sessão expirou, faça o login novamente.',
      })
      this.router.navigate(['/entrar'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  atualizar() {
    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'As senhas não coincidem',
      })
    } else {
      this.authService.putUser(this.user).subscribe((resp: User) => {
        this.user = resp
        this.router.navigate(['/home'])
        Swal.fire({
          icon: 'success',
          title: 'Usuário atualizado com sucesso!',
          
        })
        environment.token = ''
        environment.nome = ''
        environment.foto = ''
        environment.id = 0

        this.router.navigate(['/entrar'])
      })
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }
  sair(){
    this.router.navigate(['/home'])

  }
  deletar() {
    this.authService.deleteUser(this.idUser).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Usuario excluido com sucesso com sucesso!',
      
      })
      environment.token = ''
      environment.nome = ''
      environment.foto = ''
      environment.id = 0
      
      this.router.navigate(['/entrar'])
    })
  }

}