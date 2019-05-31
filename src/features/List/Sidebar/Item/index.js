import React from "react";
import gql from "graphql-tag";
import { Text, TouchableOpacity } from "react-native";

export const ListSidebarItem = ({ isSelected, name, onClick }) => (
  <TouchableOpacity onPress={onClick}>
    <Text>{name}</Text>
  </TouchableOpacity>
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
