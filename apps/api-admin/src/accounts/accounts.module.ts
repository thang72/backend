import { Response } from 'express';
import * as passport from 'passport';

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { CookieSerializer } from '@ssc/common';
import { AccountsRpcClientService } from '@ssc/core';

import { AccountsMutationResolver } from './accounts-mutation.resolver';
import { AccountsController } from './accounts.controller';
import { AccountsResolver } from './accounts.resolver';
import { AccountsService } from './accounts.service';
import {
  FacebookStrategy,
  GithubStrategy,
  GoogleStrategy,
  LocalStrategy,
} from './strategy';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  providers: [
    AccountsRpcClientService,
    AccountsResolver,
    AccountsMutationResolver,
    AccountsService,
    FacebookStrategy,
    GithubStrategy,
    GoogleStrategy,
    LocalStrategy,
    CookieSerializer,
  ],
  controllers: [AccountsController],
})
export class AccountsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const facebookLoginOptions = {
      session: true,
      state: null,
    };

    consumer
      .apply(
        (req: any, res: any, next: () => void) => {
          const {
            query: { state },
          } = req;
          facebookLoginOptions.state = state;
          next();
        },
        passport.authenticate('facebook', facebookLoginOptions),
        (req, res: Response) => {
          res.redirect('https://sunshine.io');
        },
      )
      .forRoutes('account/facebook/callback');

    consumer
      .apply(
        (req: any, res: any, next: () => void) => {
          const {
            query: { state },
          } = req;
          facebookLoginOptions.state = state;
          next();
        },
        passport.authenticate('google', facebookLoginOptions),
        (req, res: Response) => {
          res.redirect('https://sunshine.io');
        },
      )
      .forRoutes('account/google/callback');

    consumer
      .apply(
        (req: any, res: any, next: () => void) => {
          const {
            query: { state },
          } = req;
          facebookLoginOptions.state = state;
          next();
        },
        passport.authenticate('github', facebookLoginOptions),
        (req, res: Response) => {
          res.redirect('https://sunshine.io');
        },
      )
      .forRoutes('account/github/callback');
  }
}
