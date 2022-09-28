import { Note } from "./schemas/note.schema";

export const notes: Note[] = [
  {
    id: 1,
    name: "Shopping List",
    created: "April 20, 2021",
    category: "Task",
    content: "Tomatoes, bread",
    date: '',
    archived: false,
  },
  {
    id: 2,
    name: "The theory of evolution",
    created: "April 27, 2021",
    category: "Random Thought",
    content: "The evolution",
    date: '',
    archived: false,
  },
  {
    id: 3,
    name: "New Feature",
    created: "May 05, 2021",
    category: "Idea",
    content: "Implement new feature in project on the 15/09/2022",
    date: '15/09/2022',
    archived: false,
  },
  {
    id: 4,
    name: "William Gaddis",
    created: "May 07, 2021",
    category: "Quote",
    content: "Power doesn't co...",
    date: '',
    archived: false,
  },
  {
    id: 5,
    name: "Books",
    created: "May 15, 2021",
    category: "Task",
    content: "The Lean Startup",
    date: '',
    archived: true,
  },
  {
    id: 6,
    name: "Dantist",
    created: "Sep 28, 2022",
    category: "Task",
    content: "Visit a dantist on 12/10/2022",
    date: '12/10/2022',
    archived: true,
  }
]