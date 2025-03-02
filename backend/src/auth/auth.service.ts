import { Injectable } from '@nestjs/common';
import { NewUser } from 'src/interfaces/userFields.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(data: NewUser) {
    const user = await this.userService.create(data);
    return user;
  }
}
