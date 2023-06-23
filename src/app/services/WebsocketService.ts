import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User } from 'src/app/models/User';

@Injectable()
export class WebsocketService {
	// Our socket connection
	private socket:any;
	loggedInUser = new User();
	constructor(private _authService: AuthService, private _router: Router){}
	connect(user:any): Rx.Subject<MessageEvent>{
		// If you aren't familiar with environment variables then
		// you can hard code `environment.ws_url` as `http://localhost:5000`
		this.socket = io(environment.websocket_url, {
			query: `userId=${user.id}&type=${user.type}&account_service_enabled=${user.account_service_enabled}&portal_usage=${user.portal_usage}`
		});
		// this.socket.acks={id:this.loggedInUser.id};
		// We define our observable which will observe any incoming messages
		// from our socket.io server.
		let observable = new Observable((observer:any) => {
			this.socket.on('message', (data:any) => {
				if (!this._authService.checkIfLoggedIn()){
					this.dissconnect();
					this._router.navigate(['account','login']);
				} else {
					observer.next(data);
				}
			});
			return () => {
				this.socket.disconnect();
			};
		});

		// We define our Observer which will listen to messages
		// from our other components and send messages back to our
		// socket server whenever the `next()` method is called.
		let observer = {
			next: (data: Object) => {
				this.socket.emit('message', JSON.stringify(data));
			}
		};

		// we return our Rx.Subject which is a combination
		// of both an observer and observable.
		return Rx.Subject.create(observer, observable);
	}

	dissconnect(){
		this.socket.disconnect();
	}

	connectSocket(){
		this.socket.connect();
	}

}
