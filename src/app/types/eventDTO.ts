import {EventSlot} from "./eventSlot";
import {User} from "./user";

export interface EventDTO {
  id?: string,
  title?: string,
  userId?: string,
  description?: string,
  location?: string,
  eventSlots?: EventSlot[]
}
