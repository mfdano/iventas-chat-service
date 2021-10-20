import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from 'src/service/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';

import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('sign_up')
  async signUp(@Body() user: any): Promise<void> {
    await this.userService.save(user)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any>{
    return this.authService.login(req);
  }
}
