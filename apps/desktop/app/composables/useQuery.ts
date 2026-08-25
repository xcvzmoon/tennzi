import type {
  HumanReadable,
  PullRow,
  QueryOrQueryRequest,
  ReadonlyJSONValue,
  ResultType,
} from '@rocicorp/zero';
import type { schema } from '@tennzi/zero';
import { shallowRef, watchEffect } from 'vue';

type DbSchema = typeof schema;

export function useQuery<
  TTable extends keyof DbSchema['tables'],
  TInput extends ReadonlyJSONValue | undefined,
  TOutput extends ReadonlyJSONValue | undefined,
  TReturn = PullRow<TTable>,
>(queryFactory: () => QueryOrQueryRequest<TTable, TInput, TOutput, DbSchema, TReturn, unknown>) {
  const data = shallowRef<HumanReadable<TReturn>>();
  const status = shallowRef<ResultType>('unknown');

  watchEffect((onCleanup) => {
    const view = useZero().materialize(queryFactory());

    data.value = view.data;
    status.value = 'unknown';

    const unsubscribe = view.addListener((_result, resultType) => {
      data.value = view.data;
      status.value = resultType;
    });

    onCleanup(() => {
      unsubscribe();
      view.destroy();
    });
  });

  return { data, status };
}
