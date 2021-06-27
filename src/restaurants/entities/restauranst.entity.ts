import { Field, ObjectType } from "@nestjs/graphql";
import { type } from "os";



@ObjectType()
export class Restaurant{
    @Field(type => String)
    name : String;
    @Field(type => Boolean, {nullable:true})
    isGood?: boolean;
}