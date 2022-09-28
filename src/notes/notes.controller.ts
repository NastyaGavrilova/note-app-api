import { Controller, Get, Param, ParseIntPipe, NotFoundException, Post, Body } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
// import { IdValidationPipe } from "src/pipe/idValid.pipe";
import { NotesService } from "./notes.service";
import { Note } from "./schemas/note.schema";

@Controller("notes")
export class NotesController {
  constructor(private notesService: NotesService) { }

  @Get('/stats')
  getStats() {
    return this.notesService.getStats()
  }
  @Get("")
  async getAll(): Promise<Note[]> {
    return this.notesService.getAll()
  }
  @Get('/:id')
  getById(
    @Param('id', ParseIntPipe) id: number
  ) {
    const note = this.notesService.getById(id)
    if (!note) {
      throw new NotFoundException('Note with this ID not found')
    }
    return note;
  }
  @Post('')
  createNote(
    @Body() createNoteDto: CreateNoteDto
  ) {
    return this.notesService.createNote(createNoteDto)
  }


}
