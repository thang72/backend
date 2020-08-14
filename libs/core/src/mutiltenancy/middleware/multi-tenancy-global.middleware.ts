import * as vhost from 'vhost';

import { IRequest } from '@ssc/common';

import { BuildTenantInfoHelper } from '../';
import { MultiTenancyConfig } from '../interface';

export function enableMultiTenancy(option: MultiTenancyConfig) {
  if (option.tenantResolver.resolverType === 'Domain') {
    return vhost('*.localhost', (req: IRequest, res, next) => {
      // @ts-ignore
      req.tenantInfoOption = option;
      if (!option.enabled) {
        next();
      }

      if (req.vhost.length) {
        req.tenantInfo = new BuildTenantInfoHelper(req, option)
          .withOptions(true)
          .build();
        next();
      } else {
        next();
      }
    });
  }

  return (req: IRequest, res: Response, next) => {
    if (!option.enabled) {
      next();
    }

    req.tenantInfo = new BuildTenantInfoHelper(req, option)
      .withOptions(true)
      .build();
    next();
  };
}
