// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	current_environment: 'local',
	// encryption_key: 'YDF7IirWSIUxR4ijMHXQrpVQ1ZyI0bR6',
	encryption_key: '0228202310301035',
	api_url: 'https://marketplaceapi.archesoftronix.in/',
	// api_url: 'http://localhost:5052/',
	client_app_url: 'http://localhost:4200/',
	stripeKey: '',
	websocket_url: 'http://localhost:7144/',
	google_map_api_key: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
