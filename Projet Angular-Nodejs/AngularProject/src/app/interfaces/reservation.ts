export interface Reservation {
  _id?: string;
  user: string;
  meetingRoom: string;
  startTime: Date;
  endTime: Date;
}
