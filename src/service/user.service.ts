import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { User } from '../model/user.model';
import { AddUserDTO } from 'src/dto/add_user.dto';

const SALT_PASSWORD = 10;

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async save(_user: AddUserDTO): Promise<void> {
    const passwordHash = await bcrypt.hash(_user.password, SALT_PASSWORD);
    const user = new this.userModel(_user);
    user.password = passwordHash;
    await user.save();
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email: email });
  }
 
}
