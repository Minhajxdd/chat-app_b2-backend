import { Injectable } from "@nestjs/common";
import { UserRepository } from "../Database/Repository/user.repository";

@Injectable()
export class AuthProfileService {
    constructor(
        private readonly _userRepository: UserRepository
    ) {

        const data = this._userRepository.findOne({});
    }
}