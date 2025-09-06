"use client";

import { motion } from "framer-motion";
import { Book, ChevronRight, Code, FileCode, Package, Zap } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTranslations } from "next-intl";

type DocSection = "getting-started" | "api" | "guides" | "examples";

export default function DocsPage() {
  const [activeSection, setActiveSection] =
    useState<DocSection>("getting-started");
  const t = useTranslations('docs');

  const sections = [
    {
      id: "getting-started" as DocSection,
      label: t('sections.gettingStarted'),
      icon: <Book className="w-4 h-4" />,
    },
    {
      id: "api" as DocSection,
      label: t('sections.api'),
      icon: <Code className="w-4 h-4" />,
    },
    {
      id: "guides" as DocSection,
      label: t('sections.guides'),
      icon: <FileCode className="w-4 h-4" />,
    },
    {
      id: "examples" as DocSection,
      label: t('sections.examples'),
      icon: <Zap className="w-4 h-4" />,
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "getting-started":
        return <GettingStarted />;
      case "api":
        return <ApiReference />;
      case "guides":
        return <Guides />;
      case "examples":
        return <Examples />;
      default:
        return <GettingStarted />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 lg:sticky lg:top-24 lg:h-fit">
            <nav className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                {t('title')}
              </h3>
              <ul className="space-y-1">
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      }`}
                    >
                      {section.icon}
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8"
            >
              {renderContent()}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}

function GettingStarted() {
  const t = useTranslations('docs.gettingStarted');
  const installCode = `npm install @context-query/react
# or
yarn add @context-query/react
# or
pnpm add @context-query/react`;

  const basicUsage = `import { createContextQuery } from '@context-query/react';

// 1. Define state types
type AppAtoms = {
  user: { name: string; email: string };
  theme: { mode: 'light' | 'dark' };
  counter: { value: number };
};

// 2. Create Context Query
export const {
  ContextQueryProvider,
  useContextAtom,
  useContextAtomValue,
  useContextSetAtom
} = createContextQuery<AppAtoms>();

// 3. Wrap app with Provider (initial atoms required)
function App() {
  return (
    <ContextQueryProvider
      atoms={{
        user: { name: "John Doe", email: "user@example.com" },
        theme: { mode: "light" },
        counter: { value: 0 }
      }}
    >
      <YourComponents />
    </ContextQueryProvider>
  );
}

// 4. Use in components
function UserProfile() {
  const [user, setUser] = useContextAtom("user");
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}`;

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          {t('installation.title')}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('installation.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="bash"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {installCode}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('basicUsage.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('basicUsage.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {basicUsage}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('features.title')}</h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 mt-1 text-blue-500" />
            <span>
              <strong>{t('features.scopedState.title')}</strong> {t('features.scopedState.description')}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 mt-1 text-blue-500" />
            <span>
              <strong>{t('features.optimizedRendering.title')}</strong> {t('features.optimizedRendering.description')}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 mt-1 text-blue-500" />
            <span>
              <strong>{t('features.typeScript.title')}</strong> {t('features.typeScript.description')}
            </span>
          </li>
          <li className="flex items-start gap-2">
            <ChevronRight className="w-4 h-4 mt-1 text-blue-500" />
            <span>
              <strong>{t('features.reactFriendly.title')}</strong> {t('features.reactFriendly.description')}
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}

function ApiReference() {
  const t = useTranslations('docs.apiReference');
  const apiExamples = {
    createContextQuery: `// Create Context Query instance
const {
  ContextQueryProvider,
  useContextAtom,
  useContextAtomValue,
  useContextSetAtom
} = createContextQuery<AtomTypes>();`,

    useContextAtom: `// Read and write state
const [state, setState] = useContextAtom("atomKey");

// Usage example - Use inside Provider
function Counter() {
  const [counter, setCounter] = useContextAtom("counter");
  
  return (
    <button onClick={() => setCounter(prev => ({ 
      ...prev, 
      value: prev.value + 1 
    }))}>
      Count: {counter.value}
    </button>
  );
}`,

    useContextAtomValue: `// Read-only state
const value = useContextAtomValue("atomKey");

// Usage example
function Display() {
  const counter = useContextAtomValue("counter");
  return <p>Current count: {counter.value}</p>;
}`,

    useContextSetAtom: `// Write-only state
const setState = useContextSetAtom("atomKey");

// Usage example
function ResetButton() {
  const setCounter = useContextSetAtom("counter");
  
  return (
    <button onClick={() => setCounter({ value: 0 })}>
      Reset
    </button>
  );
}`,
  };

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">{t('title')}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('createContextQuery.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('createContextQuery.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {apiExamples.createContextQuery}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('useContextAtom.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('useContextAtom.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {apiExamples.useContextAtom}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('useContextAtomValue.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('useContextAtomValue.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {apiExamples.useContextAtomValue}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('useContextSetAtom.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('useContextSetAtom.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {apiExamples.useContextSetAtom}
          </SyntaxHighlighter>
        </div>
      </section>
    </div>
  );
}

function Guides() {
  const t = useTranslations('docs');
  const formExample = `// Form state management example
import { createContextQuery } from '@context-query/react';

type FormAtoms = {
  formData: {
    name: string;
    email: string;
    message: string;
  };
  formErrors: {
    name?: string;
    email?: string;
    message?: string;
  };
  isSubmitting: boolean;
};

const { ContextQueryProvider, useContextAtom } = createContextQuery<FormAtoms>();

function ContactFormApp() {
  return (
    <ContextQueryProvider
      atoms={{
        formData: { name: "", email: "", message: "" },
        formErrors: {},
        isSubmitting: false
      }}
    >
      <ContactForm />
    </ContextQueryProvider>
  );
}

function ContactForm() {
  const [formData, setFormData] = useContextAtom("formData");
  const [errors, setErrors] = useContextAtom("formErrors");
  const [isSubmitting, setIsSubmitting] = useContextAtom("isSubmitting");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: FormAtoms["formErrors"] = {};
    if (!formData.name) newErrors.name = "Please enter your name";
    if (!formData.email) newErrors.email = "Please enter your email";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // API call
      await submitForm(formData);
      // Handle success
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}`;

  const performanceExample = `// Performance optimization example
function OptimizedComponent() {
  // Subscribe only to needed state
  const userName = useContextAtomValue("user").name;
  const setTheme = useContextSetAtom("theme");
  
  // Only uses user.name, so component won't re-render 
  // when other user properties change
  
  return (
    <div>
      <h1>Welcome, {userName}</h1>
      <button onClick={() => setTheme({ mode: 'dark' })}>
        Dark Mode
      </button>
    </div>
  );
}`;

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">{t('guides.title')}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('guides.formManagement.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('guides.formManagement.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {formExample}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('guides.performance.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('guides.performance.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-4">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {performanceExample}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('guides.bestPractices.title')}</h2>
        <ul className="space-y-3 text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <div>
              <strong>{t('guides.bestPractices.stateStructure.title')}</strong> {t('guides.bestPractices.stateStructure.description')}
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <div>
              <strong>{t('guides.bestPractices.hookSelection.title')}</strong> {t('guides.bestPractices.hookSelection.description')}
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <div>
              <strong>{t('guides.bestPractices.typeSafety.title')}</strong> {t('guides.bestPractices.typeSafety.description')}
            </div>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500">✓</span>
            <div>
              <strong>{t('guides.bestPractices.providerLocation.title')}</strong> {t('guides.bestPractices.providerLocation.description')}
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

function Examples() {
  const t = useTranslations('docs');
  const todoExample = `// Todo app example
import { createContextQuery } from '@context-query/react';

type TodoAtoms = {
  todos: Array<{
    id: string;
    text: string;
    completed: boolean;
  }>;
  filter: 'all' | 'active' | 'completed';
};

const { ContextQueryProvider, useContextAtom } = createContextQuery<TodoAtoms>();

function TodoApp() {
  return (
    <ContextQueryProvider
      atoms={{
        todos: [
          { id: "1", text: "Learn Context Query", completed: false },
          { id: "2", text: "Build example project", completed: true }
        ],
        filter: "all"
      }}
    >
      <TodoList />
      <TodoFilter />
    </ContextQueryProvider>
  );
}

function TodoList() {
  const [todos, setTodos] = useContextAtom("todos");
  const [filter] = useContextAtom("filter");
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };
  
  return (
    <ul>
      {filteredTodos.map(todo => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
}`;

  const themeExample = `// Theme toggle example
import { createContextQuery } from '@context-query/react';
import { useEffect } from 'react';

type ThemeAtoms = {
  theme: {
    mode: 'light' | 'dark';
    primaryColor: string;
    fontSize: 'small' | 'medium' | 'large';
  };
};

const { ContextQueryProvider, useContextAtom } = createContextQuery<ThemeAtoms>();

function ThemeApp({ children }: { children: React.ReactNode }) {
  return (
    <ContextQueryProvider
      atoms={{
        theme: {
          mode: "light",
          primaryColor: "#3B82F6",
          fontSize: "medium"
        }
      }}
    >
      <ThemeProvider>
        {children}
      </ThemeProvider>
    </ContextQueryProvider>
  );
}

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useContextAtom("theme");
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme.mode === 'dark');
    document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
  }, [theme]);
  
  return <>{children}</>;
}

function ThemeToggle() {
  const [theme, setTheme] = useContextAtom("theme");
  
  const toggleMode = () => {
    setTheme(prev => ({
      ...prev,
      mode: prev.mode === 'light' ? 'dark' : 'light'
    }));
  };
  
  return (
    <button onClick={toggleMode}>
      {theme.mode === 'light' ? '🌙' : '☀️'}
    </button>
  );
}`;

  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <h1 className="text-3xl font-bold mb-6">{t('examples.title')}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('examples.todoApp.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('examples.todoApp.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {todoExample}
          </SyntaxHighlighter>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">{t('examples.themeToggle.title')}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {t('examples.themeToggle.description')}
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden">
          <SyntaxHighlighter
            language="typescript"
            style={vscDarkPlus}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              background: "transparent",
            }}
          >
            {themeExample}
          </SyntaxHighlighter>
        </div>
      </section>
    </div>
  );
}
