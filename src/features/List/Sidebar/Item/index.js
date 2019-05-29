import React from "react";
import gql from "graphql-tag";
import { Text, View } from "react-native";

export const ListSidebarItem = ({ isSelected, name, tasks, onClick }) => (
  <View>
    <Text>{name}</Text>
  </View>
);

ListSidebarItem.fragment = gql`
  fragment ListSidebarItemFragment on List {
    id
    name
    tasks(filter: { completed: { eq: false } }, limit: 10) {
      items {
        id
      }
    }
  }
`;
