import {Component} from '@angular/core';

import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'https://accounts.google.com',

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + '/notetaking',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: '***REMOVED***',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'id_token token',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile email',

  strictDiscoveryDocumentValidation: false,

  showDebugInformation: true,

  // Not recommented:
  // disablePKCI: true,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }
  title = 'planar';

  public isLoggedIn() {
    return this.oauthService.hasValidAccessToken();
  }

  public get name() {
    const claims = this.oauthService.getIdentityClaims();
    if (!claims) {
      return null;
    }
    console.log(claims);
    // @ts-ignore
    return claims.name;
  }

  public logout() {
    this.oauthService.logOut();
  }
}
