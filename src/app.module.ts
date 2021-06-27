import { Module, Query } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { RestaurantsModule } from './restaurants/restaurants.module';


@Module({
  imports: [
    RestaurantsModule,
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "parkjiho",
      "password": "0000",
      "database": "nuber-eats",
      "synchronize": true,
      "logging": true,
      "entities": [
         "src/entity/**/*.ts"
      ],
      "migrations": [
         "src/migration/**/*.ts"
      ],
      "subscribers": [
         "src/subscriber/**/*.ts"
      ]
    }),
    GraphQLModule.forRoot({
    autoSchemaFile: true,
  }), 
],
  controllers: [],
  providers: [],
})
export class AppModule {}
