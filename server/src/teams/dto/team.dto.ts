import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class TeamDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  name!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 3, { message: 'Abbreviation must be 3 characters' })
  abbr!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
  city!: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 30, { message: 'Name must be between 3 and 30 characters' })
  stadium!: string;
}
