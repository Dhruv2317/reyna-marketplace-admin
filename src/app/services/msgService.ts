import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './WebsocketService';
import { AuthService } from './auth.service';
import { User } from 'src/app/models/User';

@Injectable()
export class MsgService {
	messages!: Subject<any>;
	loggedInUser:any;
	sendMessageInterval: any;
	// Our constructor calls our wsService connect method
	constructor(private wsService: WebsocketService, private _authService: AuthService) {
		this.init();
    this.loggedInUser=new User();
	}

	init(){
		this.loggedInUser = this._authService.getUser();
		if (!this.messages && this.loggedInUser && this.loggedInUser.id) {
			this.messages = <Subject<any>>this.wsService.connect(this.loggedInUser).map((response: any): any => {
				return response;
			});
			this.startInterval();
		}
	}


	dissconnectSocket(){
		this.wsService.dissconnect();
		this.messages.next(null);
	}

	connectSocket(){
		this.init();
	}

	startInterval() {
		this.messages.subscribe((msg:any) => {
		});
		this.sendMessageInterval = setInterval(() => this.sendMessage(), 3000);
	}
	sendMessage(){
		if(this.messages && this.loggedInUser){
			this.messages.next({
				userId: this.loggedInUser.id,
				type: this.loggedInUser.type,
				typeName: this.getUserType(this.loggedInUser.type),
				msg: 'user is alive : on ' + new Date().getSeconds()
			});
		} else {
			clearInterval(this.sendMessageInterval);
		}
	}

	getUserType(id:number){
		var name = '';
		switch (id){
			case 0:
				name = 'admin';
				break;
		}
		return name;
	}

}
