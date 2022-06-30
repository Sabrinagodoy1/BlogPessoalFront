import { UserLogin } from './../model/UserLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  refreshToken() {
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token),
    };
  }
 deleteUser(id:number){
  this.refreshToken()
  return this.http.delete(`https://blogpessoalsasa.herokuapp.com/usuarios/${id}`, this.token)

 }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>(
      'https://blogpessoalsasa.herokuapp.com/usuarios/logar',
      userLogin
    );
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>(
      'https://blogpessoalsasa.herokuapp.com/usuarios/cadastrar',
      user
    );
  }

  getByIdUser(id: number): Observable<User> {
    this.refreshToken()
    console.log(environment.token)
    console.log(this.token);
    return this.http.get<User>(`https://blogpessoalsasa.herokuapp.com/usuarios/${id}`, { headers: new HttpHeaders().set('Authorization', environment.token) });
  }

  putUser(user:User):Observable<User>{
    this.refreshToken()
    return this.http.put<User>('https://blogpessoalsasa.herokuapp.com/usuarios/atualizar', user, this.token)
  }

  logado() {
    let ok = false;

    if (environment.token != '') {
      ok = true;
    }

    return ok;
  }

  adm() {
  let ok: boolean = false

  if (environment.tipo == 'adm'){
    ok = true
  }

  return ok
}
}

