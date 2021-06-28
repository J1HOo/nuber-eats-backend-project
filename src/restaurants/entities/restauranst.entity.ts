import { Field, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";



@ObjectType()
@Entity()
export class Restaurant{

    @PrimaryGeneratedColumn()
    @Field(type => Number)
    id:number;

    @Field(type => String)
    @Column()
    name : String;

    @Field(type => Boolean)
    @Column()
    isVegan?: boolean;

    @Field(type => String)
    @Column()
    address : String;

    @Field(type => String)
    @Column()
    ownersName : String;
}