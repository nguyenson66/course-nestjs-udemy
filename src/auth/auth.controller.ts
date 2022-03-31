import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { User } from './auth.entity';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() register: UserDto): Promise<User> {
    return this.authService.registerUser(register);
  }

  @Post('/login')
  loginUser(@Body() userLogin: LoginUserDto): Promise<{ accessToken: string }> {
    return this.authService.loginUser(userLogin);
  }
}
