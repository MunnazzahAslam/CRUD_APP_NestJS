import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guard";
import { GetUser } from "src/auth/decorator";
import { User } from "@prisma/client";

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController{

    @ApiBearerAuth('JWT')
    @ApiCreatedResponse()
    @Get()
    getUsers(@GetUser() user: User) {
        return user;
    }
}