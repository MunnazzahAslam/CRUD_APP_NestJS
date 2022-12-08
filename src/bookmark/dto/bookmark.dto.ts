import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class BookmarkDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty()
    description?: string;
    
    @ApiProperty()
    @IsNotEmpty()
    link: string;
}