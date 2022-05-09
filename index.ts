import { Module } from '@nestjs/common';
import {
    KeycloakConnectModule,
    ResourceGuard,
    RoleGuard,
    AuthGuard,
} from 'nest-keycloak-connect';
import 'dotenv/config';
import { APP_GUARD } from '@nestjs/core';
import KcAdminClient from '@keycloak/keycloak-admin-client';

@Module({
    imports: [
        KeycloakConnectModule.register({
            authServerUrl: process.env.KEYCLOAK_URL,
            realm: process.env.KEYCLOAK_REALM,
            clientId: process.env.KEYCLOAK_CLIENT,
            secret: process.env.KEYCLOAK_SECRET,
            // Secret key of the client taken from keycloak server
            multiTenant: {
                realmResolver: () => process.env.KEYCLOAK_REALM,
                realmSecretResolver: () => process.env.KEYCLOAK_SECRET,
            },
        }),
    ],
    providers: [
        // This adds a global level authentication guard,
        // you can also have it scoped
        // if you like.
        //
        // Will return a 401 unauthorized when it is unable to
        // verify the JWT token or Bearer header is missing.
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
        // This adds a global level resource guard, which is permissive.
        // Only controllers annotated with @Resource and
        // methods with @Scopes
        // are handled by this guard.
        {
            provide: APP_GUARD,
            useClass: ResourceGuard,
        },
        // New in 1.1.0
        // This adds a global level role guard, which is permissive.
        // Used by `@Roles` decorator with the
        // optional `@AllowAnyRole` decorator for allowing any
        // specified role passed.
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class KeycloakModule {}

const kcAdminClient = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_URL,
    realmName: process.env.KEYCLOAK_ADMIN_REALM,
});

export async function getKcAdminClient() {
    await kcAdminClient.auth({
        username: process.env.KEYCLOAK_ADMIN_USER,
        password: process.env.KEYCLOAK_ADMIN_PASS,
        grantType: 'password',
        clientId: process.env.KEYCLOAK_ADMIN_CLIENT,
    });

    return kcAdminClient;
}