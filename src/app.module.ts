import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from "@nestjs/config"
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { SequelizeModule } from "@nestjs/sequelize";
import { Note } from "./notes/notes.model"

@Module({
  imports: [NotesModule, ConfigModule.forRoot({
    envFilePath: '.env'
  }), SequelizeModule.forRoot({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [Note],
    autoLoadModels: true
  })

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
