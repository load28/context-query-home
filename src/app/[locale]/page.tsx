"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Layers, Sparkles, Zap } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations();

  const handleNavigation = useCallback(
    (path: string) => {
      router.push(`/${locale}${path}`, { scroll: true });
    },
    [router, locale]
  );
  const codeExample = `import { createContextQuery } from '@context-query/react';

// 상태 타입 정의
type CounterAtoms = {
  counter: { 
    name: string;
    value: number; 
  };
};

// Context Query 생성
const { 
  ContextQueryProvider, 
  useContextAtom 
} = createContextQuery<CounterAtoms>();

// 앱에 Provider 적용
function App() {
  return (
    <ContextQueryProvider
      atoms={{
        counter: { name: "메인 카운터", value: 0 }
      }}
    >
      <Counter />
    </ContextQueryProvider>
  );
}

// 컴포넌트에서 사용
function Counter() {
  const [counter, setCounter] = useContextAtom("counter");
  
  const increment = () => {
    setCounter((prev) => ({ 
      ...prev, 
      value: prev.value + 1 
    }));
  };
  
  return (
    <button onClick={increment}>
      {counter.name}: {counter.value}
    </button>
  );
}`;

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: t("features.lightweight.title"),
      description: t("features.lightweight.description"),
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: t("features.simple.title"),
      description: t("features.simple.description"),
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: t("features.performance.title"),
      description: t("features.performance.description"),
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: t("features.typeScript.title"),
      description: t("features.typeScript.description"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {t("hero.subtitle")}
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              {t("hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative">
              <button
                onClick={() => {
                  handleNavigation("/docs");
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                type="button"
              >
                {t("hero.getStarted")}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  handleNavigation("/examples");
                }}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                type="button"
              >
                {t("hero.viewExamples")}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("features.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {locale === "ko"
                ? "복잡한 설정 없이 바로 사용할 수 있는 강력한 기능들"
                : "Powerful features ready to use without complex setup"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              {t("codeExample.title")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 text-center">
              {t("codeExample.description")}
            </p>

            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-sm text-gray-400">counter.tsx</span>
              </div>
              <SyntaxHighlighter
                language="typescript"
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  padding: "1.5rem",
                  fontSize: "0.9rem",
                  background: "transparent",
                }}
              >
                {codeExample}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              {t("quickStart.title")}
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {t("quickStart.step1")}
                </p>
                <code className="text-lg text-gray-900 dark:text-white font-mono">
                  npm install @context-query/react
                </code>
              </div>

              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {locale === "ko" ? "yarn 사용" : "Using yarn"}
                </p>
                <code className="text-lg text-gray-900 dark:text-white font-mono">
                  yarn add @context-query/react
                </code>
              </div>
            </div>

            <div className="mt-12">
              <button
                onClick={() => handleNavigation("/docs")}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {locale === "ko" ? "문서 보기" : "View Documentation"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {locale === "ko"
                ? "지금 Context Query를 시작하세요"
                : "Start with Context Query Now"}
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              {locale === "ko"
                ? "더 나은 React 개발 경험을 위한 첫 걸음"
                : "Your first step towards better React development experience"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/load28/context-query"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors"
              >
                {locale === "ko" ? "GitHub에서 보기" : "View on GitHub"}
              </a>
              <button
                onClick={() => handleNavigation("/docs")}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-white/20 backdrop-blur border border-white/30 rounded-lg hover:bg-white/30 transition-colors"
              >
                {locale === "ko" ? "문서 읽기" : "Read Documentation"}
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
