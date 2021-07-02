import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { isAbstractType } from "graphql";
import { type } from "os";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity } from "typeorm";


type UserRole = 'client' | 'owner' | 'delivery'

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity{

    @Column()
    @Field(type => String)
    email: String;

    @Column()
    @Field(type => String)
    password: String;

    @Column()
    @Field(type => String)
    role: UserRole;

}