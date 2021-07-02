import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateAccountInput } from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

    async createAccount({email, password, role}: CreateAccountInput): Promise<string | undefined> {
        try{
            const exists = await this.users.findOne({ email });
            if (exists) {
                return '해당 이메일을 가진 사용자가 이미 존재합니다.';
            }
            await this.users.save(this.users.create({ email, password, role }));
        } catch(e){
            return '계정을 생성할 수 없었습니다.';
        }
    }
}