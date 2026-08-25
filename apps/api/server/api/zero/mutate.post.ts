import { mustGetMutator } from '@rocicorp/zero';
import { handleMutateRequest } from '@rocicorp/zero/server';
import { mutators } from '@tennzi/zero';
import { db } from '@tennzi/zero/db';
import { defineHandler } from 'nitro';

export default defineHandler((event) => {
  return handleMutateRequest({
    dbProvider: db,
    request: event.req,
    userID: null,
    handler: (transact) => {
      return transact((tx, name, args) => {
        const mutator = mustGetMutator(mutators, name);
        return mutator.fn({ tx, args });
      });
    },
  });
});
