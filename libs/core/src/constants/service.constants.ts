const baseUrl = process.cwd() + '/dist/libs/proto-schema/';

export const SERVICE_LIST = {
  role: {
    package: 'srv.role',
    consulName: 'srv.role',
    service: 'RoleService',
    protoPath: baseUrl + 'proto/role.proto',
  },
  access: {
    package: 'srv.access',
    consulName: 'srv.access',
    service: 'AccessService',
    protoPath: baseUrl + 'proto/access.proto',
  },
  webhook: {
    package: 'srv.webhook',
    consulName: 'srv.webhook',
    service: 'WebhookService',
    protoPath: baseUrl + 'proto/webhook.proto',
  },
  billing: {
    package: 'srv.billing',
    consulName: 'srv.billing',
    service: 'BillingService',
    protoPath: baseUrl + 'proto/billing.proto',
  },
  tenant: {
    package: 'srv.tenant',
    consulName: 'srv.tenant',
    service: 'TenantService',
    protoPath: baseUrl + 'proto/tenant.proto',
  },
  account: {
    package: 'srv.account',
    consulName: 'srv.account',
    service: 'AccountService',
    protoPath: baseUrl + 'proto/account.proto',
  },
  project: {
    package: 'srv.project',
    consulName: 'srv.project',
    service: 'ProjectService',
    protoPath: baseUrl + 'proto/project.proto',
  },
  admin: {
    consulName: 'api.admin',
  },
};
