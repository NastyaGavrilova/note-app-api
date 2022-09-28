import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";

export class CreateNoteDto {

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  category: string

  @IsString()
  @IsNotEmpty()
  content: string

  @IsOptional()
  @IsString()
  date?: string

  @IsBoolean()
  archived: boolean

}