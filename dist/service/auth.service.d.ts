import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.model';
import { UserService } from '../service/user.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<User>;
    login(result: any): Promise<any>;
}
