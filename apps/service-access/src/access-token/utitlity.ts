import { randomBytes } from 'crypto';

import { Access } from '@ssc/proto-schema/access';
import { AccessTokenEntity } from '@ssc/repository';

export async function generateUniqueByte() {
  const buffer = await randomBytes(12);
  return buffer.toString('hex');
}

export function mapAccessTokenEntityToProto(at: AccessTokenEntity): Access {
  return {
    active: at.active,
    // @ts-ignore
    createdAt: at?.createdAt,
    // @ts-ignore
    updatedAt: at?.updatedAt,
    id: at.id.toString(),
    createdBy: at?.createdBy?.toString(),
    name: at?.name,
    scopes: at?.scopes,
    tenantId: at.tenantId,
    token: at.token,
  };
}

export function mapAccessEntityArrToProto(ats: AccessTokenEntity[]): Access[] {
  const list: Access[] = [];
  for (const at of ats) {
    list.push(mapAccessTokenEntityToProto(at));
  }

  return list;
}
