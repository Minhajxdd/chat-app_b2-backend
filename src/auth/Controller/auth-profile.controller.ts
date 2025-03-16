import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';
import { AuthProfileService } from '../Service/auth.profile.service';

@UseGuards(AuthGuard)
@Controller('profile')
export class AuthProfileController {
    
constructor(
    private readonly _authProfileService: AuthProfileService
) {
    
}

  @Get('users')
  getUsers() {
    console.log('user profile logs');
    return this._authProfileService.getUsers();
  }
}
