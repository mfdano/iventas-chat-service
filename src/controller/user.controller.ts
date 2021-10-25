import { Controller, Post, UseGuards, Request, Body, Res, HttpStatus, Get  } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AddUserDTO } from 'src/dto/add_user.dto';
import { AuthService } from 'src/service/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('sign_up')
  async signUp(@Body() user: AddUserDTO): Promise<void> {
    await this.userService.save(user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async findAll(@Request() request, @Res({ passthrough: true }) response: Response) {
    const result = await this.authService.login(request);
    response.cookie('token', result.access_token, { httpOnly: true })
    response.status(HttpStatus.OK).json({ id: result.id })
  }

  @UseGuards(JwtAuthGuard)
  @Get('check_auth')
  async checkAuth(@Request() request, @Res({ passthrough: true }) response: Response) {
    response.status(HttpStatus.OK).json({ id: request.user.id });
  }
}
