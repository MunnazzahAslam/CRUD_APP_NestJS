import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService, private Jwt: JwtService, private config: ConfigService) { }

    async register(dto: AuthDto) {
        try {
            const hash = await argon.hash(dto.password);

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    createdAt: true
                }
            })

            return this.signInToken(user.id, user.email);
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Email already exists, please try with a different one')
                }
            }
            throw error;
        }
    }

    async login(dto: AuthDto) {
        const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email,
            }
        });

        if (!user) throw new ForbiddenException('User doesnot exist');

        const pwMatches = await argon.verify(user.hash, dto.password);

        if (!pwMatches) throw new ForbiddenException('Password is incorrect');

        return this.signInToken(user.id, user.email);
    }

    async signInToken(userId: number, email: string): Promise<{access_token: string}>  {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET');
        const token = await this.Jwt.signAsync(payload, {
            expiresIn: '15m',
            secret
        })
        return {
            access_token: token,
        };
    }
}