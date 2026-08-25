import { defineQueries, defineQuery } from '@rocicorp/zero';
import { zql } from './schema.ts';

export const queries = defineQueries({
  todos: {
    all: defineQuery(() => zql.todo.orderBy('title', 'asc')),
  },
});
