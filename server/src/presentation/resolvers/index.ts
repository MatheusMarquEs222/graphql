import clientResolver from "./client.resolver";
import productResolver from "./product.resolver";
import saleResolver from "./sale.resolver";
import scheduleHistoryResolver from "./schedule-history.resolver";
import scheduleResolver from "./schedule.resolver";

export default {
    Query: {
        ...clientResolver.Query,
        ...productResolver.Query,
        ...saleResolver.Query,
        ...scheduleResolver.Query,
        ...scheduleHistoryResolver.Query
    },
    Mutation: {
        ...clientResolver.Mutation,
        ...productResolver.Mutation,
        ...saleResolver.Mutation,
        ...scheduleResolver.Mutation,
    },
};