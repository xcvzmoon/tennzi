import type { MutateRequest, MutatorResultErrorDetails, ReadonlyJSONValue } from '@rocicorp/zero';

export function useMutation<TInput extends ReadonlyJSONValue | undefined>(
  mutator: (args: TInput) => MutateRequest<TInput>,
) {
  const pending = shallowRef<boolean>(false);
  const error = shallowRef<MutatorResultErrorDetails['error']>();

  async function mutate(args: TInput) {
    pending.value = true;
    error.value = undefined;

    const { server } = useZero().mutate(mutator(args));
    const details = await server;

    pending.value = false;

    if (details.type === 'error') {
      error.value = details.error;
    }
  }

  return { mutate, pending, error };
}
