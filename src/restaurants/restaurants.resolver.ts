import { Query } from "@nestjs/common";
import { Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restauranst.entity";



@Resolver(of => Restaurant)
export class RestaurantResolver{}
//@Query(() returns => Restaurant)
//myRestaurant() {
  //  return true;
//}