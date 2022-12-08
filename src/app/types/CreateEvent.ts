export interface CreateEvent{
  title: string;
  ownerId: string;
  description: string;
  location: string;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  startTime: Date;
  endTime: Date | undefined;
}

