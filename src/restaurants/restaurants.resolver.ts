import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Restaurant } from "./entities/restauranst.entity";

@Resolver(of => Restaurant)
export class RestaurantResolver {
  @Query(returns => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: Boolean): Restaurant[] {
    return [];
  }
@Mutation(returns => Boolean)
createResoaurants(
  @Args() Restaurant: Restaurant
  ): Boolean {
      return true;
    }
  }