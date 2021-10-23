import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { User } from 'src/model/user.model';

import { UserService } from '../service/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);
    console.log(JSON.stringify(user, null, 2))

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      return user;
    }
    return null;
  }

  async login(result): Promise<any> {
    console.log(result)
    const payload = { email: result.user.email };
    return { access_token: this.jwtService.sign(payload), id: result.user.id };
  }
}