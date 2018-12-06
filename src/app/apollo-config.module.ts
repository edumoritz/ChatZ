import { GRAPHCOOL_CONFIG, GraphcoolConfig } from './core/providers/graphcool-config.provider';
import { StorageKeys } from './storage-keys';
import { NgModule, Inject } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { persistCache } from 'apollo-cache-persist';
import { WebSocketLink } from 'apollo-link-ws';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { environment } from '../environments/environment';
import { ApolloLink, Operation } from '../../node_modules/apollo-link';
import { getOperationAST } from 'graphql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

@NgModule({
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule
  ]
})
export class ApolloConfigModule {

  private subscriptionClient: SubscriptionClient;

  constructor(
    private apollo: Apollo,
    @Inject(GRAPHCOOL_CONFIG) private graphcoolConfig: GraphcoolConfig,
    private httpLink: HttpLink
  ) {
    const uri = this.graphcoolConfig.simpleAPI;

    const http = httpLink.create({ uri });

    const authMiddleware: ApolloLink = new ApolloLink((operation, forward) => {

      operation.setContext({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.getAuthToken()}`
        })
      })

      return forward(operation);
    })

    const linkError = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
      }
      if (networkError) { console.log(`[Network error]: ${networkError}`); }
    });

    const ws = new WebSocketLink({
      uri: this.graphcoolConfig.subscriptionsAPI,
      options: {
        reconnect: true,
        timeout: 30000,
        connectionParams: () => {
          return {
            'Authorization': `Bearer ${this.getAuthToken()}`
          };
        }
      }
    });

    this.subscriptionClient = (<any>ws).subscriptionClient;

    const cache = new InMemoryCache();

    persistCache({
      cache,
      storage: window.localStorage
    }).catch(err => {
      console.log('Error while persisting cache: ', err);
    })

    apollo.create({
      link: ApolloLink.from([
        linkError,
        ApolloLink.split(
          (operation: Operation) => {
            const operationAST = getOperationAST(operation.query, operation.operationName);
            return !!operationAST && operationAST.operation === 'subscription';
          },
          ws,
          authMiddleware.concat(http)
        )
      ]),
      cache,
      connectToDevTools: !environment.production
    });
  }

  closeWebSocketConnection(): void {
    this.subscriptionClient.close(true, true);
  }

  private getAuthToken(): string {
    return window.localStorage.getItem(StorageKeys.AUTH_TOKEN);
  }
}
