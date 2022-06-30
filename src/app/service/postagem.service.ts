import { Postagem } from './../model/Postagem';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }

  getAllPostagem(): Observable<Postagem[]>{
    this.refreshToken()
    console.log(this.token)
    return this.http.get<Postagem[]>('https://blogpessoalsasa.herokuapp.com/postagens', this.token)
  }

  getPostagemById(id: number): Observable<Postagem>{
    this.refreshToken()
    return this.http.get<Postagem>(`https://blogpessoalsasa.herokuapp.com/postagens/${id}`, this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem> {
    this.refreshToken()
    return this.http.post<Postagem>('https://blogpessoalsasa.herokuapp.com/postagens/cadastrar', postagem, this.token)
  }

  putPostagem(postagem: Postagem): Observable<Postagem> {
    this.refreshToken()
    return this.http.put<Postagem>('https://blogpessoalsasa.herokuapp.com/postagens/atualizar', postagem, this.token)
  }

  deletePostagem(id: number){
    this.refreshToken()
    return this.http.delete(`https://blogpessoalsasa.herokuapp.com/postagens/${id}`, this.token)
  }

}
