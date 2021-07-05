import { Inject, Injectable } from '@nestjs/common';
import { JwpModuleOptions } from './interfaces/jwt.interfaces';
import { CONFIG_OPTIONS } from './jwt.constants';
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
    constructor(
     @Inject(CONFIG_OPTIONS) private readonly options: JwpModuleOptions) {
     console.log(options); 
    }
    sign( userId:Number): string {
        return jwt.sign({ id: userId }, this.options.privateKey);
    }
}
