import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class BookmarkDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @ApiProperty()
    description?: string;
    
    @ApiProperty()
    @IsNotEmpty()
    link: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}