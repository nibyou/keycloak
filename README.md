# Nibyou Keycloak Module for NestJS

This package is a NestJS Module that integrates Keycloak authentication into existing Nibyou Microservices based on NestJS.

## Installation

You can easily use this package to integrate Keycloak auth in your NestJS Services.

Add the package:

```bash
npm i --save @nibyou/keycloak
```

or

```bash 
yarn add @nibyou/keycloak
```

Then you need to add the following configuration to your root .env file:

```env
KEYCLOAK_URL=https://KEYCLOAK.YOURDOMAIN.TLD/auth
KEYCLOAK_REALM=master
KEYCLOAK_CLIENT=master-ui
KEYCLOAK_SECRET=some-very-secure-secret
```
<sup>Poissibly newer env variables can be found [here](https://github.com/nibyou/keycloak/blob/master/.env.extend).</sup>


## Usage

In your app.module.ts you can now add:

```ts
import { KeycloakModule } from '@nibyou/keycloak'; // <-- the import

@Module({
  imports: [
    KeycloakModule, // <-- add the module to your app module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```