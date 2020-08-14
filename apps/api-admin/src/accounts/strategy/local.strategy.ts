import { GraphQLLocalStrategy } from 'graphql-passport';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { LoginServiceTypes } from '@ssc/proto-schema/account';

import { AccountsService } from '../accounts.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(GraphQLLocalStrategy) {
  constructor(private readonly accountService: AccountsService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    if (email && password) {
      const user = await this.accountService.validateUser({
        service: LoginServiceTypes.Password,
        params: {
          password,
          email,
          accessToken: undefined,
          userId: undefined,
        },
      });

      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    }
    throw new UnauthorizedException();
  }
}
