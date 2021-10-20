import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UserService } from '../service/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}