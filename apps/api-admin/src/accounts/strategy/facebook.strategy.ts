import { Strategy } from 'passport-facebook';

import { InjectConfig } from '@nestcloud/config';
import { EtcdConfig } from '@nestcloud/config/etcd-config';
import {
  Injectable,
  Logger,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  CreateRequest,
  LoginRequest,
  LoginServiceTypes,
} from '@ssc/proto-schema/account';

import { AccountsService } from '../accounts.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  logger = new Logger(this.constructor.name);

  constructor(
    @InjectConfig() private readonly config: EtcdConfig,
    private readonly accountService: AccountsService,
  ) {
    super({
      clientID: config.get<string>('app.auth.strategies.facebook.clientID'),
      clientSecret: config.get<string>(
        'app.auth.strategies.facebook.clientSecret',
      ),
      callbackURL: config.get<string>(
        'app.auth.strategies.facebook.callbackURL',
      ),
      profileFields: ['id', 'email', 'first_name', 'last_name'],
    });
  }

  async validate(accessToken, refreshToken, profile, done): Promise<any> {
    if (profile && profile.emails.length > 0) {
      const logCmd: LoginRequest = {
        service: LoginServiceTypes.Facebook,
        params: {
          accessToken,
          userId: profile.id,
          email: profile.emails[0].value,
          password: undefined,
        },
      };

      const regCmd: CreateRequest = {
        service: LoginServiceTypes.Facebook,
        tokens: {
          accessToken,
          userId: profile.id,
        },
        email: profile.emails[0].value,
        firstname: profile?.name?.givenName,
        lastname: profile?.name?.familyName,
        password: undefined,
        username: undefined,
      };

      const user = await this.accountService.validateOrCreateUser(
        logCmd,
        regCmd,
      );

      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    }
    throw new NotImplementedException();
  }
}
