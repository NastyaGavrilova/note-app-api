import { Injectable, ForbiddenException } from "@nestjs/common";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize, QueryTypes } from 'sequelize';
import { Note } from "./notes.model";

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private Notes: typeof Note) { }

  async getAll() {
    return this.Notes.findAll({ include: { all: true } })
  }
  async getById(id: number) {
    return await this.Notes.findOne({
      where: { id },
      include: { all: true },
    });
  }
  async getStats() {
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        dialect: 'postgres',
        host: process.env.DB_HOST,
      },
    );

    sequelize
      .authenticate()
      .then(() => console.log('Connected.'))
      .catch((err) => console.error('Connection error: ', err));

    return await sequelize.query(
      `select 
			category, 
			sum(case when archived then 1 else 0 end) as archived,
			sum(case when archived then 0 else 1 end) as active
		from
			"Notes" 
		group by
			category`,
      {
        raw: true,
        type: QueryTypes.SELECT,
      },
    );
  }

  async createNote(createNoteDto: CreateNoteDto) {
    return await this.Notes.create(createNoteDto);

  }

  async deleteNote(id: number) {
    const note = await this.Notes
      .findOne({ where: { id } })
      .catch((e) => {
        console.log(e.message);
      });
    if (!note) console.log('Remove error');
    else await note.destroy();
  }

  async updateNote(id: number, updateNoteDto: UpdateNoteDto) {
    try {
      await this.Notes.update(updateNoteDto, { where: { id } });
      return await this.Notes.findOne({
        where: { id },
        include: { all: true },
      });
    } catch (err) {
      console.log(err);
    }
  }


}