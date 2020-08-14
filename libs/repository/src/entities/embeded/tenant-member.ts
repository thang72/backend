import { ObjectID } from 'mongodb';

/* tslint:disable:max-classes-per-file */
import { Entity } from '@juicycleff/repo-orm';
import { AppRole, InvitationStatus } from '@ssc/contracts';

@Entity({ name: 'tenant-member' })
export class TenantMemberEmbed {
  id!: string | ObjectID;

  email: string;

  userId?: ObjectID | string;

  status!: InvitationStatus;

  role: AppRole;

  invitedBy!: string | ObjectID | any;

  createdAt!: Date | string;

  updatedAt!: Date | string;
}

export class BillingSettingEmbed {
  currentPlan?: string;

  currentSubscription?: string;
}

export class TenantSettingsEmbed {
  database?: DbConnectionEmbed;
  enableTheme?: boolean;
}

export class DbConnectionEmbed {
  host?: string;

  port?: string;
}
