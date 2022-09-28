import { IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateNoteDto {

  @IsString()
  @IsOptional()
  name: string

  @IsString()
  @IsOptional()
  category: string

  @IsString()
  @IsOptional()
  content: string

  @IsString()
  @IsOptional()
  date?: string

  @IsBoolean()
  @IsOptional()
  archived: boolean


}