export class Event {

  name!: string|undefined;
  type!: string|undefined;
  description!: string|undefined;
  location!: string|undefined;
  startTime!: Date|undefined;
  endTime!: Date|undefined;
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
