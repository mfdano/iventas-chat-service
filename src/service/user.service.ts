import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { User } from '../model/user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async save(_user: any): Promise<void> {
    const passwordHash = await bcrypt.hash(_user.password, 10);
    const user = new this.userModel({ name: _user.name, email: _user.email, password: passwordHash});
    await user.save();
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }
 
}
