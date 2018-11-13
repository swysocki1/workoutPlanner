export class Notification {
  _id: string;
  users: [string];
  message: string;
  created: Date;
  viewed: [{user: string, seen: Date}];
  type: string;
  link: string;
}
