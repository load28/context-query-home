import { createContextQuery } from "@context-query/react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoAtoms = {
  todos: Todo[];
  newTodo: string;
  editingId: number | null;
  editText: string;
};

export const {
  ContextQueryProvider: TodoQueryProvider,
  useContextAtom: useTodoAtom,
  useContextAtomValue: useTodoAtomValue,
  useContextSetAtom: useTodoSetAtom,
} = createContextQuery<TodoAtoms>();