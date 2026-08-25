import { boolean, createBuilder, createSchema, string, table } from '@rocicorp/zero';

const todo = table('todo')
  .columns({
    id: string(),
    title: string(),
    done: boolean(),
  })
  .primaryKey('id');

export const schema = createSchema({
  tables: [todo],
});

export const zql = createBuilder(schema);

declare module '@rocicorp/zero' {
  interface DefaultTypes {
    schema: typeof schema;
  }
}
