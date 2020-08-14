import { merge } from 'lodash';
import { Db, MongoClient } from 'mongodb';

import {
  BaseMongoRepository,
  Before,
  InjectClient,
  InjectDb,
  MongoEntityRepository,
} from '@juicycleff/repo-orm';
import { CACHE_MANAGER, CacheStore, Inject, Injectable } from '@nestjs/common';
import { generateHashedPassword } from '@ssc/common/utils';

import { UserEntity } from '../entities';

@Injectable()
@MongoEntityRepository({
  name: 'user',
  indexes: [
    {
      fields: { 'emails.address': 1 },
      options: { unique: true, sparse: true },
    },
    {
      fields: { username: 1 },
      options: { unique: true, sparse: true },
    },
  ],
})
export class UserRepository extends BaseMongoRepository<UserEntity> {
  constructor(
    @InjectClient() private readonly dbc: MongoClient,
    @InjectDb() private readonly db: Db,
    @Inject(CACHE_MANAGER) private readonly cache: CacheStore,
  ) {
    super({ client: dbc, db }, cache, null);
  }

  @Before('CREATE')
  private onSaveData(data: Partial<UserEntity>): Partial<UserEntity> {
    return {
      ...data,
      services: {
        ...data.services,
        password: {
          hashed:
            data.services?.password?.hashed &&
            generateHashedPassword(data.services.password.hashed),
        },
      },
      ...this.onSave(),
    };
  }

  @Before('UPDATE')
  private onUpdateData(data: Partial<any>) {
    return merge(data, this.onUpdate());
  }
}
