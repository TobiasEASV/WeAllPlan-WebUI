import {SlotAnswer} from "./slotAnswer";
import {EventDTO} from "./eventDTO";

export interface EventSlot {

  id: string,
  eventId: number,
  startTime: Date,
  endTime: Date | undefined,
  slotAnswers?: SlotAnswer[],
  confirmed?: boolean
}
