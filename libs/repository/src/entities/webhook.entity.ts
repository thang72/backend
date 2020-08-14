import { Entity } from '@juicycleff/repo-orm';
import { WebhookCrudEnum, WebhookHttpVerbEnum } from '@ssc/contracts';

import { BaseEntity } from './base-entity';

export type AuthTypeEntity =
  | {
      type: 'NONE';
    }
  | {
      type: 'API_KEY';
      key: string;
      value: string;
      addTo: string;
    }
  | {
      type: 'BASIC';
      username: string;
      password: string;
    }
  | {
      type: 'OAUTH_2';
      accessToken: string;
      addTo: string;
    }
  | {
      type: 'TOKEN';
      token: string;
    };

export type WebhookResourceNode =
  | {
      type: 'NONE';
    }
  | {
      type: 'API_KEY';
      key: string;
      value: string;
      addTo: string;
    }
  | {
      type: 'BASIC';
      username: string;
      password: string;
    }
  | {
      type: 'OAUTH_2';
      accessToken: string;
      addTo: string;
    }
  | {
      type: 'TOKEN';
      token: string;
    };

@Entity({ name: 'webhook' })
export class WebhookEntity extends BaseEntity<any> {
  name: string;

  endpoint: string;

  auth: AuthTypeEntity;

  requestType: WebhookHttpVerbEnum;

  action?: WebhookCrudEnum;

  tenantId?: string;

  selections?: string;

  active?: boolean;
}
