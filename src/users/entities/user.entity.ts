import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";


type UserRole = 'client' | 'owner' | 'delivery'

@Entity()
export class User extends CoreEntity{

    @Column()
    email: String;

    @Column()
    password: String;

    @Column()
    role: UserRole;

}