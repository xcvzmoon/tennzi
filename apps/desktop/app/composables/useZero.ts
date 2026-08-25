import { Zero } from '@rocicorp/zero';
import { mutators, schema } from '@tennzi/zero';

let zero: Zero | undefined;

export function useZero(): Zero {
  const runtimeConfig = useRuntimeConfig();
  const cacheURL = runtimeConfig.public.cache.url;
  zero ??= new Zero({ schema, mutators, cacheURL });
  return zero;
}
