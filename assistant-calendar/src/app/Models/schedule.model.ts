export class Schedule {
  scheduleId: string;
  title: string;
  description: string;
  events: Event[];
  constructor(scheduleData: any) {
    // Initialize properties from the provided data
    this.scheduleId = scheduleData.scheduleId || '';
    this.title = scheduleData.title || '';
    this.description = scheduleData.description || '';
    this.events = scheduleData.events || [];
  }

  // methods for schedule related behavior
}
