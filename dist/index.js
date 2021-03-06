"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKcAdminClient = exports.KeycloakModule = void 0;
const common_1 = require("@nestjs/common");
const nest_keycloak_connect_1 = require("nest-keycloak-connect");
require("dotenv/config");
const core_1 = require("@nestjs/core");
const keycloak_admin_client_1 = require("@keycloak/keycloak-admin-client");
let KeycloakModule = class KeycloakModule {
};
KeycloakModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nest_keycloak_connect_1.KeycloakConnectModule.register({
                authServerUrl: process.env.KEYCLOAK_URL,
                realm: process.env.KEYCLOAK_REALM,
                clientId: process.env.KEYCLOAK_CLIENT,
                secret: process.env.KEYCLOAK_SECRET,
                multiTenant: {
                    realmResolver: () => process.env.KEYCLOAK_REALM,
                    realmSecretResolver: () => process.env.KEYCLOAK_SECRET,
                },
            }),
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.AuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.ResourceGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: nest_keycloak_connect_1.RoleGuard,
            },
        ],
    })
], KeycloakModule);
exports.KeycloakModule = KeycloakModule;
const kcAdminClient = new keycloak_admin_client_1.default({
    baseUrl: process.env.KEYCLOAK_URL,
    realmName: process.env.KEYCLOAK_ADMIN_REALM,
});
async function getKcAdminClient() {
    await kcAdminClient.auth({
        username: process.env.KEYCLOAK_ADMIN_USER,
        password: process.env.KEYCLOAK_ADMIN_PASS,
        grantType: 'password',
        clientId: process.env.KEYCLOAK_ADMIN_CLIENT,
    });
    return kcAdminClient;
}
exports.getKcAdminClient = getKcAdminClient;
//# sourceMappingURL=index.js.map