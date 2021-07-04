import { Inject, Injectable } from '@nestjs/common';
import { JwpModuleOptions } from './interfaces/jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.constants';

@Injectable()
export class JwtService {
    constructor(
     @Inject(CONFIG_OPTIONS) private readonly options: JwpModuleOptions) {
     console.log(options); 
    }
    hello() {
        console.log('hello');
    }
}
