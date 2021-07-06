import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
    ) {}

    async createAccount({email, password, role}: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
        try{
            const exists = await this.users.findOne({ email });
            if (exists) {
                return { ok: false, error: '해당 이메일을 가진 사용자가 이미 존재합니다.' };
            }
            await this.users.save(this.users.create({ email, password, role }));
            return { ok: true };
        } catch(e){
            return { ok: false, error: '계정을 생성할 수 없었습니다.' };
        }
    }

    async login({email, password}: LoginInput): Promise<{ ok: boolean; error?: string, token?: string }> {
        try{
            const user = await this.users.findOne({email});
            if (!user) {
                return { ok: false, error: '유저를 찾을 수 없습니다.' };
            }
            const passwordCorrect = await user.cheakPassword(password);
            if (!passwordCorrect) {
                return { ok: false, error: '잘못된 패스워드입니다.' };
            }
            const token = this.jwtService.sign(user.id);
            return { ok: true, token, };
        } catch (error) {
            return { ok: false, error, };
        }
    } 
    async findById(id: number): Promise<User> {
        return this.users.findOne({ id });
    }
}