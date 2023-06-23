/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare module 'socket.io-client';
declare module 'highcharts/es-modules/masters/highcharts.src';