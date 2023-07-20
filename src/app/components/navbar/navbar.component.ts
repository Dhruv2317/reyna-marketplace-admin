import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from "../../services/auth.service";
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { notificationHelper } from 'src/app/services/notificationHelper.service';
import { AppNotification } from 'src/app/models/Notification';
import * as moment from 'moment-timezone';
import { MsgService } from 'src/app/services/msgService';
import * as io from 'socket.io-client';
import { Subscription } from 'rxjs';

declare interface RouteInfo {
	path: string;
	title: string;
	icon: string;
	class: string;
}

export const ROUTES: RouteInfo[] = [
	{ path: '/admin/dashboard', title: 'Dashboard', icon: 'fas fa-tachometer-alt', class: '' },
];

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
	public userFullName: string = '';
	private userInfo: any;
	public focus: any;
	public listTitles: any[] = [];
	public location: Location;
	public menuItems: any[] = [];

	socket: any;
	public notifications: AppNotification[] = [];
	newNotificationCount: number = 0;
	hasNewNotifications: boolean = false;

	navItems: any[] = [];
	constructor(location: Location,
		private router: Router,
		private element: ElementRef,
		private http: HttpClient,
		private _authService: AuthService,
		private msgService: MsgService,
		public _notificationHelper: notificationHelper,
		private _changeDetectorRef: ChangeDetectorRef) {
		this.location = location;

		this.navItems = [
			{ route: '/admin/dashboard', iconName: 'fa-tachometer-alt', displayName: 'Dashboard' },
			// { route: '/admin/customers', iconName: 'fa-users', displayName: 'Customers' },
			{ route: '/admin/sellers', iconName: 'fa-users', displayName: 'Sellers' },
			// { route: '/admin/dealers', iconName: 'fa-users', displayName: 'Dealers' },
			// {
			// 			displayName: 'Manufacturers & Brands',
			// 			iconName: 'fa-id-badge',
			// 			children: [
			// 		{ route: '/admin/manufacturers', iconName: 'fa-list', displayName: 'Manufacturers' },
			// 		{ route: '/admin/brands', iconName: 'fa-list', displayName: 'Brands' }
			// 	]
			// },
			// { route: '/admin/sponsor', iconName: 'fa-list', displayName: 'Sponsors' },
			// { route: '/admin/orders', iconName: 'fa-shopping-cart', displayName: 'Orders' },
			{ route: '/admin/products', iconName: 'fa-golf-ball', displayName: 'Products' },
			// { route: '/admin/top-listing-subscriptions', iconName: 'fa-golf-ball', displayName: 'Top Listing Subscriptions' },
			// { route: '/admin/dealer-subscriptions',  iconName: 'fa-users', displayName: 'Dealers Account Subscriptions'},
			{ route: '/admin/categories', iconName: 'fa-bars', displayName: 'Categories' },
			{ route: '/admin/plans', iconName: 'fa-list-alt', displayName: 'Subscription Plans' },
			{ route: '/admin/attributes', iconName: 'fa-bars', displayName: 'Attributes' },
			// { route: '/admin/orders/refund_requested', iconName: 'fa-sync-alt', displayName: 'Refund Orders' },
			// { route: '/admin/newsletter-subscribers', iconName: 'fa-envelope', displayName: 'Newsletter Subscribers' },
			// { route: '/admin/newsletter-templates', iconName: 'fa-envelope', displayName: 'Newsletter Templates' },
			{
				displayName: 'Others',
				iconName: 'fa-info-circle',
				children: [
					// { route: '/admin/policy', iconName: 'fa-file', displayName: 'Policy' },
					// { route: '/admin/faq', iconName: 'fa-question-circle', displayName: 'FAQ' },
					// { route: '/admin/faq-group', iconName: 'fa-question-circle', displayName: 'FAQ Group' },
					{ route: '/admin/settings', iconName: 'fa-cog', displayName: 'Settings' },
					/*{ route: '/admin/shipping_pricing',iconName:'fa-cog',displayName:'Shipping Pricing'},*/
					// { route: '/admin/shipping_insurance', iconName: 'fa-cog', displayName: 'Shipping insurance' },
					// { route: '/admin/article-categories', iconName: 'fa-bars', displayName: 'Article Categories' },
					// { route: '/admin/articles', iconName: 'fa-newspaper', displayName: 'Articles' },
				]
			},
			/*{ route: '/admin/reports', iconName: 'fa-file', displayName: 'Reports' }*/		]
	}

	ngOnInit() {
		this.menuItems = ROUTES;
		this.userInfo = this._authService.getUser();
		if (this.userInfo && this.userInfo.first_name && this.userInfo.last_name) {
			this.userFullName = this.userInfo.first_name + ' ' + this.userInfo.last_name;
		}

		const that = this;
		this.socket = io(environment.websocket_url);
		this.socket.on('appNotifications', () => {
			that.getNotifications();
		});
	}

	ngOnDestroy() {
	}

	logoutUser() {
		this._authService.logout().then(() => {
			this._authService.changeIsLogoutClicked(true);
			this._authService.clearStorage();
			this.dissconnectSocket();
			this.router.navigate(['/account/login']);
		});
	}

	dissconnectSocket() {
		this.msgService.dissconnectSocket();
	}

	getNotifications() {
		const url = 'api/notifications/latest';
		this.http.get(url).subscribe((data: any) => {
			this.notifications = data;
			this.getNotificationsCount();
			this.converLinkToJSON(this.notifications);
			this._changeDetectorRef.detectChanges();
		}, (err: any) => {

		})
	}

	getNotificationsCount() {
		this.newNotificationCount = 0;
		this.hasNewNotifications = false;
		this.notifications.forEach(notification => {
			if (notification.read_at == null){
				this.newNotificationCount += 1;
				this.hasNewNotifications = true;
			}
		});
	}

	converLinkToJSON(notifications: any[]) {
		notifications.forEach((notify: any) => {
			if (notify.link !== '') {
				notify.link = JSON.parse(notify.link);
			} else {
				notify.link = '';
			}
		});
	}

	clickNotification(notification: any) {
		this._notificationHelper.clickNotification(this.userInfo, notification, this.router);
		this.getNotifications();
	}

	readNotification(notificationId: number) {
		let notificationIds = [];
		notificationIds.push(notificationId);
		this._notificationHelper.readNotification(notificationIds).then((data: any) => {
			this.getNotifications();
			this._changeDetectorRef.detectChanges();
		});
	}

	readAllNotification() {
		let allNotificationIds: any[] = [];
		this.notifications.forEach((notification: any) => {
			allNotificationIds.push(notification.id);
		});
		this._notificationHelper.readNotification(allNotificationIds).then((data: any) => {
			this.getNotifications();
			this._changeDetectorRef.detectChanges();
		});
	}

	getDateForNotification(date: any) {
		var startDate = moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').tz('Asia/Calcutta');
		var endDate = moment.tz('Asia/Calcutta');
		var result = endDate.diff(startDate, 'days');
		return result <= 3 ? moment.tz(date, 'Asia/Calcutta').fromNow() : moment(date, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('MM/DD/YYYY HH:mm:ss A');
	}

}
