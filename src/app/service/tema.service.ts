import { Tema } from './../model/Tema';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemaService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }

  getAllTema(): Observable<Tema[]> {
    this.refreshToken()
    return this.http.get<Tema[]>('https://blogpessoalsasa.herokuapp.com/temas', this.token);
  }

  getByIdTema(id: number): Observable<Tema>{
    this.refreshToken()
    return this.http.get<Tema>(`https://blogpessoalsasa.herokuapp.com/temas/${id}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema> {
    this.refreshToken()
    return this.http.post<Tema>(
      'https://blogpessoalsasa.herokuapp.com/temas/cadastrar',
      tema,
      this.token
    );
  }

  putTema(tema: Tema): Observable<Tema> {
    this.refreshToken()
    return this.http.put<Tema>(
      'https://blogpessoalsasa.herokuapp.com/temas/atualizar',
      tema,
      this.token
    );
  }

  deleteTema(id: number) {
    this.refreshToken()
    return this.http.delete(
      `https://blogpessoalsasa.herokuapp.com/temas/${id}`,
      this.token
    );
  }

}
