import { TemaService } from './../../service/tema.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Tema } from './../../model/Tema';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()
  idTema: number

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Sua sessão expirou, faça o login novamente.',
      })
      this.router.navigate(['/entrar']);
    }

    this.idTema = this.route.snapshot.params['id']
    this.findByIdTema(this.idTema)
  }

  findByIdTema(id: number) {
    this.temaService.getByIdTema(id).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  deletar() {
    this.temaService.deleteTema(this.idTema).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Tema excluido com sucesso!',
      
      })
      this.router.navigate(['/tema'])
    })
  }

}
