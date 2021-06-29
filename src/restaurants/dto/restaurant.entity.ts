import { ArgsType, Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";



@ObjectType()
export class Restaurant {
    @Field(type => Number)
    @PrimaryGeneratedColumn()
    @Column()
    id: Number;

    @Field(type => String)
    @Column()
    name: string;

    @Field(type => Boolean)
    @Column()
    isVegan: boolean;

    @Field(type => String)
    @Column()
    address: string;

    @Field(type => String)
    @Column()
    ownerName: string;

    @Field(type => String)
    @Column()
    categoryName: string;
}