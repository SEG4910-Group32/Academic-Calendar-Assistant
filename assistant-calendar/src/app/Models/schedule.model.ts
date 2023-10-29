export class Schedule {
  id: string | undefined;
  owner: string | undefined;
  name: string | undefined;
  description: string | undefined;
  password: string | undefined;
  subscribedUsers: string[] | undefined;
  events: string[] | undefined;
  constructor(scheduleData: any) {
    // Initialize properties from the provided data
    if(scheduleData._id){
      this.id = scheduleData._id;
    }
    if(scheduleData.owner){
      this.owner = scheduleData.owner
    }
    if(scheduleData.name){
      this.name = scheduleData.name;
    }
    if(scheduleData.description){
      this.description = scheduleData.description
    }
    if(scheduleData.password){
      this.password = scheduleData.password
    }
    if(scheduleData.subscribedUsers){
      this.subscribedUsers = scheduleData.subscribedUsers
    }
    if(scheduleData.events){
      this.events = scheduleData.events
    }
  }
  

  // methods for schedule related behavior
}
