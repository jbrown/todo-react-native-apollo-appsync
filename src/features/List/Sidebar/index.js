import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { filter } from "graphql-anywhere";
import { Text, View } from "react-native";
import { ListSidebarItem } from "./Item";

export const ListSidebar = ({ navigation }) => {
  return (
    <Query
      query={sidebarQuery}
      fetchPolicy="network-only"
      variables={{ ...ListSidebar.sidebarQueryDefaultVariables }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) {
          return <Text>Error: {error}</Text>;
        }

        if (loading && !data.listLists) {
          return <Text>Loading...</Text>;
        }

        return (
          <View>
            {data.listLists.items.map(item => (
              <ListSidebarItem
                key={item.id}
                {...filter(ListSidebarItem.fragment, item)}
                onClick={() =>
                  navigation.push("ListDetail", {
                    id: item.id,
                    name: item.name
                  })
                }
              />
            ))}
          </View>
        );
      }}
    </Query>
  );
};

ListSidebar.fragment = gql`
  fragment ListSidebarFragment on ModelListConnection {
    items {
      ...ListSidebarItemFragment
    }
    nextToken
  }
  ${ListSidebarItem.fragment}
`;

ListSidebar.sidebarQueryDefaultVariables = {
  limit: 40
};

export const sidebarQuery = gql`
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      ...ListSidebarFragment
    }
  }
  ${ListSidebar.fragment}
`;
