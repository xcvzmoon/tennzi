import { zeroPostgresJS } from '@rocicorp/zero/server/adapters/postgresjs';
import * as v from 'valibot';
import { schema } from './schema.ts';

const envSchema = v.object({
  ZERO_UPSTREAM_DB: v.pipe(v.string(), v.nonEmpty('ZERO_UPSTREAM_DB is required')),
});

const env = v.parse(envSchema, {
  ZERO_UPSTREAM_DB: Bun.env.ZERO_UPSTREAM_DB,
});

export const db = zeroPostgresJS(schema, env.ZERO_UPSTREAM_DB);
