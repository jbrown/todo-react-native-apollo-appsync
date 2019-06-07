import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { filter } from "graphql-anywhere";
import { Text } from "react-native";
import { TaskList } from "../../Task/List";

export class ListDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("name")
    };
  };

  render() {
    return (
      <Query
        query={listDetailQuery}
        variables={{
          ...ListDetail.listDetailQueryDefaultVariables,
          id: this.props.navigation.getParam("id"),
          filter: { completed: { eq: false } }
        }}
      >
        {({ data: { getList }, loading, error }) => {
          if (error) {
            return <Text>Error: {error}</Text>;
          }

          if (loading && !getList) {
            return <Text>Loading...</Text>;
          }

          return (
            <TaskList
              onItemPress={id =>
                this.props.navigation.navigate("TaskDetail", { id })
              }
              {...filter(TaskList.fragment, getList)}
            />
          );
        }}
      </Query>
    );
  }
}

ListDetail.fragment = gql`
  fragment ListDetailFragment on List {
    id
    ...TaskListFragment
  }
  ${TaskList.fragment}
`;

ListDetail.listDetailQueryDefaultVariables = {
  limit: 30
};

export const listDetailQuery = gql`
  query GetList(
    $id: ID!
    $filter: ModelTaskFilterInput
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    getList(id: $id) {
      ...ListDetailFragment
    }
  }
  ${ListDetail.fragment}
`;
