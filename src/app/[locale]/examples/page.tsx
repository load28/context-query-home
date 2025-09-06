"use client";

import {
  CounterQueryProvider,
  useCounterAtom,
} from "@/providers/CounterContextQueryProvider";
import {
  ThemeQueryProvider,
  useThemeAtom,
} from "@/providers/ThemeContextQueryProvider";
import {
  TodoQueryProvider,
  useTodoAtom,
  type Todo,
} from "@/providers/TodoContextQueryProvider";
import { motion } from "framer-motion";
import { Check, Edit2, Minus, Plus, RefreshCw, Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ExamplesPage() {
  const t = useTranslations("examples");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
            {t("subtitle")}
          </p>
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {t("note")}
            </p>
          </div>

          <div className="grid gap-8">
            <CounterExample />
            <TodoExample />
            <ThemeExample />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function CounterExample() {
  const t = useTranslations("examples.counter");

  return (
    <CounterQueryProvider
      atoms={{
        counter: { value: 0, name: t("title") },
      }}
    >
      <CounterExampleContent />
    </CounterQueryProvider>
  );
}

function CounterExampleContent() {
  const [counter, setCounter] = useCounterAtom("counter");
  const t = useTranslations("examples.counter");

  const increment = () => {
    setCounter((prev: { value: number; name: string }) => ({
      ...prev,
      value: prev.value + 1,
    }));
  };

  const decrement = () => {
    setCounter((prev: { value: number; name: string }) => ({
      ...prev,
      value: prev.value - 1,
    }));
  };

  const reset = () => {
    setCounter((prev: { value: number; name: string }) => ({
      ...prev,
      value: 0,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {t("title")}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {t("description")}
      </p>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={decrement}
          className="w-12 h-12 rounded-lg bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
        >
          <Minus className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-4xl font-bold text-gray-900 dark:text-white min-w-[100px]">
            {counter.value}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {counter.name}
          </div>
        </div>

        <button
          onClick={increment}
          className="w-12 h-12 rounded-lg bg-green-500 hover:bg-green-600 text-white flex items-center justify-center transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          onClick={reset}
          className="ml-4 px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 flex items-center gap-2 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {t("reset")}
        </button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {t("currentState")}
        </p>
        <div className="bg-white dark:bg-gray-800 rounded p-3 border">
          <pre className="text-sm text-gray-800 dark:text-gray-200">
            {JSON.stringify({ counter }, null, 2)}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}

function TodoExample() {
  return (
    <TodoQueryProvider
      atoms={{
        todos: [
          { id: 1, text: "Read Context Query documentation", completed: true },
          { id: 2, text: "Build example project", completed: false },
          { id: 3, text: "Deploy to production", completed: false },
        ],
        newTodo: "",
        editingId: null,
        editText: "",
      }}
    >
      <TodoExampleContent />
    </TodoQueryProvider>
  );
}

function TodoExampleContent() {
  const [todos, setTodos] = useTodoAtom("todos");
  const [newTodo, setNewTodo] = useTodoAtom("newTodo");
  const [editingId, setEditingId] = useTodoAtom("editingId");
  const [editText, setEditText] = useTodoAtom("editText");
  const t = useTranslations("examples.todo");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos((prev: Todo[]) => [
        ...prev,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos((prev: Todo[]) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev: Todo[]) => prev.filter((todo) => todo.id !== id));
  };

  const startEdit = (id: number, text: string) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editingId !== null) {
      setTodos((prev: Todo[]) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, text: editText } : todo
        )
      );
      setEditingId(null);
      setEditText("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {t("title")}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {t("description")}
      </p>

      <div className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            placeholder={t("placeholder")}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            {t("addTodo")}
          </button>
        </div>
      </div>

      <ul className="space-y-2 mb-6">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                todo.completed
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              {todo.completed && <Check className="w-3 h-3 text-white" />}
            </button>

            {editingId === todo.id ? (
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  autoFocus
                />
                <button
                  onClick={saveEdit}
                  className="p-1 text-green-600 hover:text-green-700"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1 text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => startEdit(todo.id, todo.text)}
                  className="p-1 text-gray-500 hover:text-blue-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="p-1 text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {t("currentState")}
        </p>
        <div className="bg-white dark:bg-gray-800 rounded p-3 border max-h-48 overflow-y-auto">
          <pre className="text-xs text-gray-800 dark:text-gray-200">
            {JSON.stringify(
              {
                todos,
                newTodo,
                editingId,
                editText,
              },
              null,
              2
            )}
          </pre>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {t("stateNote")}
        </p>
      </div>
    </motion.div>
  );
}

function ThemeExample() {
  return (
    <ThemeQueryProvider
      atoms={{
        theme: {
          mode: "light" as "light" | "dark",
          primaryColor: "#3B82F6",
          fontSize: "medium" as "small" | "medium" | "large",
        },
      }}
    >
      <ThemeExampleContent />
    </ThemeQueryProvider>
  );
}

function ThemeExampleContent() {
  const [theme, setTheme] = useThemeAtom("theme");
  const t = useTranslations("examples.theme");

  const colors = [
    "#3B82F6", // blue
    "#10B981", // green
    "#8B5CF6", // purple
    "#EF4444", // red
    "#F59E0B", // yellow
    "#EC4899", // pink
  ];

  const fontSizes: { [key: string]: string } = {
    small: "14px",
    medium: "16px",
    large: "18px",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {t("title")}
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {t("description")}
      </p>

      <div className="space-y-6 mb-6">
        {/* 다크 모드 토글 */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            {t("currentTheme")}
          </label>
          <div className="flex gap-2">
            <button
              onClick={() =>
                setTheme((prev: typeof theme) => ({ ...prev, mode: "light" }))
              }
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme.mode === "light"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              ☀️ {t("light")}
            </button>
            <button
              onClick={() =>
                setTheme((prev: typeof theme) => ({ ...prev, mode: "dark" }))
              }
              className={`px-4 py-2 rounded-lg transition-colors ${
                theme.mode === "dark"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              🌙 {t("dark")}
            </button>
          </div>
        </div>

        {/* 주 색상 선택 */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Primary Color
          </label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() =>
                  setTheme((prev: typeof theme) => ({
                    ...prev,
                    primaryColor: color,
                  }))
                }
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  theme.primaryColor === color
                    ? "border-gray-900 dark:border-white scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* 글자 크기 */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            {t("fontSize")}
          </label>
          <div className="flex gap-2">
            {(["small", "medium", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() =>
                  setTheme((prev: typeof theme) => ({
                    ...prev,
                    fontSize: size,
                  }))
                }
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  theme.fontSize === size
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {t(`fontSizes.${size}`)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 미리보기 */}
      <div
        className={`p-6 rounded-lg border-2 ${
          theme.mode === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        <h3
          className={`font-bold mb-2 ${
            theme.mode === "dark" ? "text-white" : "text-gray-900"
          }`}
          style={{
            color: theme.primaryColor,
            fontSize: fontSizes[theme.fontSize] || "16px",
          }}
        >
          {t("previewTitle")}
        </h3>
        <p
          className={theme.mode === "dark" ? "text-gray-300" : "text-gray-600"}
          style={{ fontSize: fontSizes[theme.fontSize] || "16px" }}
        >
          {t("previewDescription")}
        </p>
        <button
          className="mt-4 px-4 py-2 rounded-lg text-white transition-colors"
          style={{ backgroundColor: theme.primaryColor }}
        >
          {t("exampleButton")}
        </button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4 mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {t("currentState")}
        </p>
        <pre className="text-xs overflow-x-auto">
          <code className="text-gray-800 dark:text-gray-200">
            {JSON.stringify(theme, null, 2)}
          </code>
        </pre>
      </div>
    </motion.div>
  );
}
