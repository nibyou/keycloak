import 'dotenv/config';
import KcAdminClient from '@keycloak/keycloak-admin-client';
export declare class KeycloakModule {
}
export declare function getKcAdminClient(): Promise<KcAdminClient>;
