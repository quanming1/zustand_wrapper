import AutoSubscribeDemo from "@/components/AutoSubscribeDemo";
import PartialSubscribeDemo from "@/components/PartialSubscribeDemo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">🎯 Zustand 字段级订阅系统</h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">真正的字段级渲染控制 - 只有相关字段变化时才重新渲染组件</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">🚀 自动订阅演示</h2>
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <AutoSubscribeDemo />
            <PartialSubscribeDemo />
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 dark:text-gray-400">基于 Zustand Subscribe API 的字段级订阅实现</p>
        </div>
      </footer>
    </div>
  );
}
