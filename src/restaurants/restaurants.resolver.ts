import { Query } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";



@Resolver()
export class RestaurantResolver{}
@Query(() returns => Boolean)
test1() {
    return true;
}