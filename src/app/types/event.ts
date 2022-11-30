export interface Event {
  id: string,
  title: string,
  user: {
    id: number,
    name: string,
    email: string,
    password: string,
    salt: string
  },
  description: string,
  location: string,
  eventSlots: [
    {
      id: number,
      event: {
        id: number,
        title: string,
        user: {
          id: number,
          name: string,
          email: string,
          password: string,
          salt: string
        },
        description: string,
        location: string,
        eventSlots: [
          string
        ]
      },
      startTime: Date,
      endTime: Date,
      slotAnswers: [
        {
          id: number,
          answer: number,
          userName: string,
          email: string,
          eventSlot: string
        }
      ],
      confirmed: boolean
    }
  ]
}
