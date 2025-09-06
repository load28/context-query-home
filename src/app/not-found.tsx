import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-300 dark:text-gray-700 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          요청하신 페이지가 존재하지 않습니다.
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}