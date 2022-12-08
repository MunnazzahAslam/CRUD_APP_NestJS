import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiCreatedResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService){}

    @ApiCreatedResponse({type: AuthDto})
    @Post('register')
    register(@Body() dto: AuthDto) {
        return this.authService.register(dto)
    }

    @HttpCode(HttpStatus.OK)
    @ApiCreatedResponse({type: AuthDto})
    @Post('login')
    login(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }
}

