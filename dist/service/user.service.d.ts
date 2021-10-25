import { Model } from 'mongoose';
import { User } from '../model/user.model';
import { AddUserDTO } from 'src/dto/add_user.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    save(_user: AddUserDTO): Promise<void>;
    findOneById(id: string): Promise<User>;
    findOneByEmail(email: string): Promise<User>;
}
