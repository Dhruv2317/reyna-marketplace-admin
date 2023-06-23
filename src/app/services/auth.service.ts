import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	username: string='';
	tempPassword: string='';
	loggedInUser:User|null=null;
	auth_token: string|null = '';
	user_id: number = 0;
	isLogoutClicked: boolean = false;

	constructor(private _http: HttpClient) {}

	setAuthorizationToken(_token: string) {
		localStorage.removeItem('access_token');
		this.auth_token = _token;
		if (this.auth_token) localStorage.setItem('access_token', this.auth_token);
	}

	getAuthorizationToken() {
		this.auth_token = localStorage.getItem('access_token');
		return this.auth_token ? this.auth_token : '';
	}

  validateToken(_token: string) {
		return this._http.post('api/auth/validate-token', {token:_token});
	}

  removeAuthorizationToken() {
    this.auth_token = '';
    localStorage.removeItem('access_token');
	}

	setUserId(id: number) {
		localStorage.removeItem('id');
		this.user_id = id;
		localStorage.setItem('id', this.user_id + '');
	}

	getUserId() {
		if (this.loggedInUser && this.loggedInUser['id'] == 0) {
      let user =localStorage.getItem('loggedInUser');
			this.loggedInUser = user ? JSON.parse(user) : null;
		}
		return this.loggedInUser && this.loggedInUser.id ? this.loggedInUser.id:null;
	}

  getAccountServiceEnabled(){
    let user:any =localStorage.getItem('loggedInUser');
    user = user ? JSON.parse(user) : null;
		return user && user.account_service_enabled;
	}

	saveUser(_user: any) {
		localStorage.removeItem('loggedInUser');
		this.loggedInUser = _user;
		localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));
	}

	getUser() {
    let user = localStorage.getItem('loggedInUser');
		this.loggedInUser = user ? JSON.parse(user):null;
		return this.loggedInUser;
	}

  clearLoggedInUser() {
		this.loggedInUser = new User();
		this.user_id = 0;
	}

	clearStorage() {
		this.loggedInUser = null;
		this.auth_token = '';
		this.user_id = 0;
		localStorage.clear();
	}

	checkIfLoggedIn() {
		var token = this.getAuthorizationToken();
		if (token && token.length > 0) {
			return true;
		}
		return false;
	}

	getIsLogoutClicked(): boolean {
		return this.isLogoutClicked;
	}

	changeIsLogoutClicked(val: boolean) {
		this.isLogoutClicked = val;
	}

	async load(): Promise<any> {
		if (this.checkIfLoggedIn()) {
			return this._http.get('api/auth/me').toPromise();
		} else{
      return new Promise((res: any, rej: any) => {
				rej({});
			});
    }
  }

  async logout():Promise<any>{
    if (this.checkIfLoggedIn()) {
       return this._http.post('api/auth/logout',{}).toPromise();
    } else{
      return new Promise((res: any, rej: any) => {
				rej({});
			});
    }
  }
}
