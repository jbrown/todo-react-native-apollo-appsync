import React from "react";
import gql from "graphql-tag";
import { filter } from "graphql-anywhere";
import { TaskListItem } from "./Item";

export const TaskList = ({ onItemPress, tasks: { items } }) => (
  <>
    {items.map(item => (
      <TaskListItem
        key={item.id}
        onPress={onItemPress}
        {...filter(TaskListItem.fragment, item)}
      />
    ))}
  </>
);

TaskList.fragment = gql`
  fragment TaskListFragment on List {
    tasks(
      filter: $filter
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        ...TaskListItemFragment
      }
      nextToken
    }
  }
  ${TaskListItem.fragment}
`;
