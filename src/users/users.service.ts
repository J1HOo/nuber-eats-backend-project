import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput, CreateAccountOutput, } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { User } from './entities/user.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { Verification } from './entities/verification.entity';
import { VerifyEmailOutput } from './dtos/verify-email.dto';
import { UserProfileOutput } from './dtos/user-profile.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UserService{
    constructor(@InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Verification)
    private readonly verifications: Repository<Verification>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService, ) {}

    async createAccount({email, password, role}: CreateAccountInput): Promise<CreateAccountOutput> {
        try{
            const exists = await this.users.findOne({ email });
            if (exists) {
                return { ok: false, error: '해당 이메일을 가진 사용자가 이미 존재합니다.' };
            }
            const user = await this.users.save(
                this.users.create({ email, password, role }));
                const verification = await this.verifications.save(
                this.verifications.create({ user, }));
            return { ok: true };
        } catch(e){
            return { ok: false, error: '계정을 생성할 수 없었습니다.' };
        }
    }

    async login({email, password}: LoginInput): Promise<LoginOutput> {
        try{
          const user = await this.users.findOne(
            { email },
            { select: ['id', 'password'] });
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

    async findById(id: number): Promise<UserProfileOutput> {
      try {
        const user = await this.users.findOne({ id });
        if (user) {
          return { ok: true, user: user, };
        }
      } catch (error) {
        return { ok: false, error: '유저를 찾을 수 없습니다.' };
      }
    }

    async editProfile(userId: number,{ email, password }: EditProfileInput): Promise<EditProfileOutput> {
      try {
        const user = await this.users.findOne(userId);
        if (email) {
          user.email = email;
          user.verified = false;
          const verification = await this.verifications.save(
            this.verifications.create({ user }));
          this.mailService.sendVerificationEmail(user.email, verification.code);
        }
        if (password) {
          user.password = password;
        }
        await this.users.save(user);
        return { ok: true };
      } catch (error) {
        return { ok: false, error: '프로필을 업데이트하지 못했습니다.' };
      }
    }

      async verifyEmail(code: string): Promise<VerifyEmailOutput> {
        try {
          const verification = await this.verifications.findOne(
            { code },
            { relations: ['user'] });
          if (verification) {
            verification.user.verified = true;
            await this.users.save(verification.user);
            await this.verifications.delete(verification.id);
            return { ok: true };
          }
          return { ok: false, error: 'Verification not found.' };
        } catch (error) {
          return { ok: false, error };
        }
      }
    }
    