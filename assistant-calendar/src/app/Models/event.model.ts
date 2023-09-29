export class Event {
    
  scheduleId: string;
    type!: String;
    dueDate!: String;
    startDate!: String;
    location!: String;
    description!: String;

    constructor(eventData: any) {
      this.scheduleId = eventData.scheduleId;
      this.type = eventData.type;
      this.dueDate = eventData.dueDate;
      this.startDate = eventData.startDate;
      this.location = eventData.location;
      this.description = eventData.description;  
    }
  }