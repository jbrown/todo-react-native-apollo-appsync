import React from "react";
import gql from "graphql-tag";
import { Text, TouchableOpacity } from "react-native";

export const TaskListItem = ({ id, name, onPress }) => (
  <TouchableOpacity onPress={() => onPress(id)}>
    <Text>{name}</Text>
  </TouchableOpacity>
);

TaskListItem.fragment = gql`
  fragment TaskListItemFragment on Task {
    id
    name
    completed
    createdAt
    updatedAt
    priority
    tags
    version
    list {
      id
    }
    comments {
      items {
        id
        content
      }
    }
  }
`;
