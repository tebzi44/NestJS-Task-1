import { IsArray, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AddMovieDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsDate()
    release_date: Date;

    @IsNumber()
    runtime: number;

    @IsArray()
    genre: number[];

    @IsArray()
    actor: number[];

    @IsArray()
    director: number[];
}