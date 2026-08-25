<script setup lang="ts">
  import { mutators, queries } from '@tennzi/zero';

  const { data: todos } = useQuery(() => queries.todos.all());
  const { mutate: createTodo } = useMutation(mutators.todos.create);
  const { mutate: toggleTodoDone } = useMutation(mutators.todos.toggle);
  const { mutate: deleteTodo } = useMutation(mutators.todos.remove);

  const title = ref<string>('');

  function addTodo() {
    if (!title.value) return;
    createTodo({ id: crypto.randomUUID(), title: title.value });
    title.value = '';
  }

  function toggleTodo(id: string, done: boolean) {
    toggleTodoDone({ id, done });
  }

  function removeTodo(id: string) {
    deleteTodo({ id });
  }
</script>

<template>
  <div class="h-svh p-4 pt-10">
    <UFieldGroup class="w-full">
      <UInput
        v-model.trim="title"
        color="neutral"
        variant="outline"
        class="flex-1"
        autofocus
      />

      <UButton
        color="neutral"
        variant="subtle"
        label="Add new todo"
        @click="addTodo"
      />
    </UFieldGroup>

    <ul class="mt-4 space-y-1">
      <li
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center justify-between"
      >
        <UCheckbox
          :model-value="todo.done"
          :label="todo.title"
          @update:model-value="toggleTodo(todo.id, $event === true)"
        />

        <UButton
          color="error"
          variant="soft"
          icon="i-lucide-trash"
          @click="removeTodo(todo.id)"
        />
      </li>
    </ul>
  </div>
</template>
