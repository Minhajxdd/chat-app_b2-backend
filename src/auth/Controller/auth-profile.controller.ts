import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';

@UseGuards(AuthGuard)
@Controller('profile')
export class AuthProfileController {

    @Get('users')
    getUsers() {
        return 'hello users'
    }
}
