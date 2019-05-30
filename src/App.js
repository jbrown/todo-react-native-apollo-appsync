import React from "react";
import { Text } from "react-native";

import Client from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import awsConfig from "../aws-exports";
import { ListSidebar } from "./features/List";

const client = new Client({
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    type: awsConfig.aws_appsync_authenticationType,
    apiKey: awsConfig.aws_appsync_apiKey
  }
});

const App = () => {
  return <ListSidebar />;
};

const WithProvider = () => {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <App />
      </Rehydrated>
    </ApolloProvider>
  );
};

export default WithProvider;
