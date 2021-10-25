import { Response } from 'express';
import { AddUserDTO } from 'src/dto/add_user.dto';
import { AuthService } from 'src/service/auth.service';
import { UserService } from '../service/user.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    signUp(user: AddUserDTO): Promise<void>;
    findAll(request: any, response: Response): Promise<void>;
    checkAuth(request: any, response: Response): Promise<{
        id: any;
    }>;
}
