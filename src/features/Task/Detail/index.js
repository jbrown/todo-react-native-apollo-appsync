import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Text } from "react-native";

export const TaskDetail = ({ navigation }) => (
  <Query query={taskDetailQuery} variables={{ id: navigation.state.params.id }}>
    {({ data: { getTask: task }, loading, error }) => {
      if (error) {
        return <Text>Error: {error}</Text>;
      }

      if (loading && !task) {
        return <Text>Loading...</Text>;
      }

      return <Text>{task.name}</Text>;
    }}
  </Query>
);

TaskDetail.fragment = gql`
  fragment TaskDetailFragment on Task {
    id
    name
    completed
    priority
    tags
    version
    list {
      id
      name
    }
  }
`;

export const taskDetailQuery = gql`
  query GetTask($id: ID!) {
    getTask(id: $id) {
      ...TaskDetailFragment
    }
  }
  ${TaskDetail.fragment}
`;
