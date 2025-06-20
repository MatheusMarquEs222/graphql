import clientResolver from "./client.resolver";
import productResolver from "./product.resolver";
import saleResolver from "./sale.resolver";

export default {
    Query: {
        ...clientResolver.Query,
        ...productResolver.Query,
        ...saleResolver.Query,
    },
    Mutation: {
        ...clientResolver.Mutation,
        ...productResolver.Mutation,
        ...saleResolver.Mutation,
    },
};