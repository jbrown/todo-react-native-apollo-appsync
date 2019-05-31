import React from "react";
import gql from "graphql-tag";
import { Text } from "react-native";

export const TaskListItem = ({ name }) => <Text>{name}</Text>;

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
