import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { notes } from "./notes.mock";
import { Note, NoteDocument } from "./schemas/note.schema";

@Injectable()
export class NotesService {
  notes: Note[] = notes

  async getAll(): Promise<Note[]> {
    return this.notes
  }
  async getById(id: number) {
    const noteIndex = this.notes.findIndex(note => note.id === id);
    if (noteIndex < 0) {
      throw new ForbiddenException(`The note with id ${id} does not exist`);
    } else {
      return this.notes.find(note => note.id === id);
    }
  }
  async getStats(): Promise<Array<Object>> {
    const categories = [];
    this.notes.forEach(note => {
      if (!categories.find(category => category === note.category)) {
        categories.push(note.category);
      }
    })
    const statistics = [];
    categories.forEach(category => {
      let activeNote = 0;
      let archivedNote = 0;
      this.notes.forEach(note => {

        if (note.category === category && note.active === true) {
          activeNote = activeNote + 1
        } if (note.category === category && note.active === false) {
          archivedNote = archivedNote + 1;
        }
      })

      const categoryObj = {
        categoryName: category,
        activeNotes: activeNote,
        archivedNotes: archivedNote,
      }
      statistics.push(categoryObj);
    })

    return statistics;
  }

}