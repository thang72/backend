import { Strategy } from 'passport-github';

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
export class GithubStrategy extends PassportStrategy(Strategy) {
  logger = new Logger(this.constructor.name);

  constructor(
    @InjectConfig() private readonly config: EtcdConfig,
    private readonly accountService: AccountsService,
  ) {
    super({
      clientID: config.get<string>('app.auth.strategies.github.clientID'),
      clientSecret: config.get<string>(
        'app.auth.strategies.github.clientSecret',
      ),
      callbackURL: config.get<string>('app.auth.strategies.github.callbackURL'),
      profileFields: ['id', 'email', 'read:user', 'user:email'],
    });
  }

  async validate(accessToken, refreshToken, profile, done): Promise<any> {
    if (profile && profile.emails.length > 0) {
      const logCmd: LoginRequest = {
        service: LoginServiceTypes.Github,
        params: {
          accessToken,
          userId: profile.id,
          email: profile.emails[0].value,
          password: undefined,
        },
      };

      const names = profile.displayName.split(' ');
      const regCmd: CreateRequest = {
        service: LoginServiceTypes.Github,
        tokens: {
          accessToken,
          userId: profile.id,
        },
        email: profile.emails[0].value,
        firstname: names[0],
        lastname: names[1],
        password: undefined,
        username: profile.username,
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
