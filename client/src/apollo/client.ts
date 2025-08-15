// src/apollo/client.ts
import API_URL from "@/services/api";
import { ApolloClient, InMemoryCache, createHttpLink, from, Observable } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { authStorage } from "@/services/authStorage";

const httpLink = createHttpLink({ uri: `${API_URL}/graphql` });

// Injeta Authorization se houver accessToken
const authLink = setContext((_, { headers }) => {
  const token = authStorage.accessToken;
  return {
    headers: {
      ...headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

async function refreshTokens(): Promise<boolean> {
  const rt = authStorage.refreshToken;
  if (!rt) return false;

  try {
    const res = await fetch(`${API_URL}/graphql`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation Refresh($token: String!){
          refreshToken(token: $token){
            accessToken
            refreshToken
          }
        }`,
        variables: { token: rt },
      }),
    });

    const json = await res.json();
    const payload = json?.data?.refreshToken;

    if (payload?.accessToken && payload?.refreshToken) {
      authStorage.accessToken = payload.accessToken;
      authStorage.refreshToken = payload.refreshToken;
      return true;
    }
  } catch {}
  authStorage.clear();
  return false;
}

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    const unauth = graphQLErrors?.some((e) => 
        e.extensions?.code === "UNAUTHENTICATED" ||
        e.message === "E_UNAUTHENTICATED"
    ) ?? false;

    if (!unauth) return;

    return new Observable((observer) => {(async () => {
        const ok = await refreshTokens();

        if (!ok) {
            observer.error(graphQLErrors?.[0] ?? new Error("UNAUTHENTICATED"));
            return;
        }

        const sub = forward(operation).subscribe({
            next: (v) => observer.next(v),
            error: (err) => observer.error(err),
            complete: () => observer.complete(),
        });

        return () => sub.unsubscribe();
    }) () });
});

const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
