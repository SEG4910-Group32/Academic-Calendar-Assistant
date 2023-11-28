export class Event {

  name!: string;
  type!: string;
  description!: string;
  location!: string;
  startTime!: Date;
  endTime!: Date;
  schedule: string|undefined;

  constructor(eventData: any) {
    this.name = eventData.name;
    this.type = eventData.type;
    this.description = eventData.description;
    this.location = eventData.location;
    this.startTime = eventData.startTime;
    this.endTime = eventData.endTime;
    this.schedule = eventData.schedule;
  }
}
