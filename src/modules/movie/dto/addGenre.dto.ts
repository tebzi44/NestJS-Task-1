import { IsNotEmpty, IsString } from "class-validator";

export class AddGenre {
    @IsString()
    @IsNotEmpty()
    genre_name: string
}