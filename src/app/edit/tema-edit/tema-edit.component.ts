import { TemaService } from './../../service/tema.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from './../../model/Tema';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema-edit',
  templateUrl: './tema-edit.component.html',
  styleUrls: ['./tema-edit.component.css'],
})
export class TemaEditComponent implements OnInit {
  tema: Tema = new Tema();

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute
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
    let id = this.route.snapshot.params['id'];
    this.findByIdTema(id);
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  atualizar() {
    this.temaService.putTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp;
      Swal.fire({
        icon: 'success',
        title: 'Tema atualizado!',
        
      })
      this.router.navigate(['/tema'])
    });
  }
}
