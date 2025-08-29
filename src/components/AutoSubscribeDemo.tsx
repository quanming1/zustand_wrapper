"use client";

import { useAutoSubscribeStore } from "@/hooks/useAutoSubscribeStore";
import { testStore } from "@/stores/testStore";

export default function AutoSubscribeDemo() {
  console.log("自动订阅演示组件：更新");
  const store = useAutoSubscribeStore(testStore);

  return (
    <div className="p-6 border-2 border-blue-500 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-600">自动订阅演示组件</h2>

      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded">
          <p className="text-sm text-gray-600">访问 propertyA（自动订阅）:</p>
          <p className="text-lg font-semibold">propertyA: {store.propertyA}</p>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <p className="text-sm text-gray-600">访问 propertyB（自动订阅）:</p>
          <p className="text-lg font-semibold">propertyB: {store.propertyB}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={store.updatePropertyA} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            更新 Property A
          </button>

          <button onClick={store.updatePropertyB} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            更新 Property B
          </button>

          <button onClick={store.resetAll} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            重置所有
          </button>
        </div>

        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          <p>这个组件只会在 propertyA 或 propertyB 变化时重新渲染</p>
          <p>自动订阅机制会追踪组件访问了哪些字段</p>
        </div>
      </div>
    </div>
  );
}
