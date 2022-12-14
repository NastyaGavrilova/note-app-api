import { Injectable, ForbiddenException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { notes } from "./notes.mock";
import { Note, NoteDocument } from "./schemas/note.schema";

@Injectable()
export class NotesService {
  notes: Note[] = notes

  async getAll(): Promise<Note[]> {
    return this.notes
  }
  async getById(id: number) {
    const index = this.notes.findIndex(note => note.id === id);
    if (index < 0) {
      throw new ForbiddenException(`The note with such ${id} does not exist`);
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

        if (note.category === category && note.archived === false) {
          activeNote = activeNote + 1
        } if (note.category === category && note.archived === true) {
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

  async createNote(createNoteDto: CreateNoteDto): Promise<Note[]> {
    const id = Date.now();
    const created = new Date();
    const month = created.getMonth();
    const day = created.getDate();
    const year = created.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const createdDate = `${monthNames[month]} ${day}, ${year}`;
    const newNote = {
      id: id,
      name: createNoteDto.name,
      created: createdDate,
      category: createNoteDto.category,
      content: createNoteDto.content,
      date: createNoteDto.date,
      archived: createNoteDto.archived,
    }
    this.notes.push(newNote)
    return this.notes;

  }

  async deleteNote(id: number): Promise<Note[]> {
    const index = this.notes.findIndex(note => note.id === id);
    if (index < 0) {
      throw new ForbiddenException(`The note with such ${id} does not exist`);
    } else {
      const delIndex = this.notes.findIndex(note => note.id === id);
      this.notes.splice(delIndex, 1);
    }

    return this.notes;
  }

  async updateNote(id: number, updateNoteDto: UpdateNoteDto): Promise<Note[]> {
    const index = this.notes.findIndex(note => note.id === id);
    if (index < 0) {
      throw new ForbiddenException(`The note with such ${id} does not exist`);
    } else {
      this.notes[index].category = updateNoteDto.category;
      this.notes[index].name = updateNoteDto.name;
      this.notes[index].content = updateNoteDto.content;
      this.notes[index].archived = updateNoteDto.archived;
    }
    return this.notes;
  }

}