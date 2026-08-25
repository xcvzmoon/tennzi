import { defineMutator, defineMutators } from '@rocicorp/zero';
import * as v from 'valibot';

export const mutators = defineMutators({
  todos: {
    create: defineMutator(v.object({ id: v.string(), title: v.string() }), async ({ args, tx }) => {
      await tx.mutate.todo.insert({ id: args.id, title: args.title, done: false });
    }),
    toggle: defineMutator(v.object({ id: v.string(), done: v.boolean() }), async ({ args, tx }) => {
      await tx.mutate.todo.update({ id: args.id, done: args.done });
    }),
    remove: defineMutator(v.object({ id: v.string() }), async ({ args, tx }) => {
      await tx.mutate.todo.delete({ id: args.id });
    }),
  },
});
