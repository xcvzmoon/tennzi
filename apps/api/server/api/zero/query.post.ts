import { mustGetQuery } from '@rocicorp/zero';
import { handleQueryRequest } from '@rocicorp/zero/server';
import { queries, schema } from '@tennzi/zero';
import { defineHandler } from 'nitro';

export default defineHandler((event) => {
  return handleQueryRequest({
    schema,
    request: event.req,
    userID: null,
    handler: (name, args) => {
      const query = mustGetQuery(queries, name);
      return query.fn({ args });
    },
  });
});
