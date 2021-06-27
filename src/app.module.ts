import { Module, Query } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { PizzasModule } from './pizzas/pizzas.module';


@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  }), 
  RestaurantsModule, PizzasModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
