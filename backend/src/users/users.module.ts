import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {
  // constructor(private usersService: UsersService) {}

  // async signUp() {
  //   return this.usersService.create();
  // }
}
