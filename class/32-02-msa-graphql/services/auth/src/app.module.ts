import { Module } from '@nestjs/common';
// import { AppController } from './app.resolver';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
  ],
  // controllers: [AppController],
  providers: [AppResolver, AppService],
})
export class AppModule {}
