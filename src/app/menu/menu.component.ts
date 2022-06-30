import { AuthService } from './../service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  id = environment.id
  nome = environment.nome
  foto = environment.foto

  constructor(
    private router: Router,
    public auth: AuthService
  ) { }

  ngOnInit() {
  }

  sair() {
    this.router.navigate(['/entrar'])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }

}
