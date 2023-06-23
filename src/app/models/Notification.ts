export interface AppNotification {
  _id: number;
  user_id: any;
  notification_text: string;
  event_type: string;
  event_id?: number;
  created_at?: string;
  updated_at?: string;
  read_at?: any;
  notification_style:string,
  notification_type:string
};
