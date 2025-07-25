import API_URL from "@/services/api";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache()
});

export default client;