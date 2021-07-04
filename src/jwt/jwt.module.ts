import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwpModuleOptions } from './interfaces/jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtService } from './jwt.service';

@Module({})
@Global()
export class JwtModule {
    static forRoot(options: JwpModuleOptions): DynamicModule {
        return {
            module: JwtModule,
            exports: [JwtService],
            providers: [
                {
                provide: CONFIG_OPTIONS,
                useValue:options,
            },
            JwtService,
        ],
        };
    }
}
