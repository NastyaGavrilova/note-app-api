import { Note } from "./schemas/note.schema";

export const notes: Note[] = [
  {
    id: 1,
    name: "Shopping List",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
    date: '',
    active: true,
  },
  {
    id: 2,
    name: "The theory of evolution",
    created: "April 27, 2021",
    category: "Random Thought",
    content: "The evolution",
    date: '',
    active: true,
  },
  {
    id: 3,
    name: "New Feature",
    created: "May 05, 2021",
    category: "Idea",
    content: "Implement new feature in project on the 15/09/2022",
    date: '15/09/2022',
    active: true,
  },
  {
    id: 4,
    name: "William Gaddis",
    created: "May 07, 2021",
    category: "Quote",
    content: "Power doesn't co...",
    date: '',
    active: true,
  },
  {
    id: 5,
    name: "Books",
    created: "May 15, 2021",
    category: "Task",
    content: "The Lean Startup",
    date: '',
    active: false,
  }
]