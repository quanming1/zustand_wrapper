/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useStores } from "@/hooks/useStores";
import { testStore } from "@/stores/testStore";
import { useEffect } from "react";

export default function AutoSubscribeDemo() {
  console.log("自动订阅演示组件：更新");
  const store = useStores(testStore);
  const propertyA = store.propertyA;
  const propertyB = store.propertyB;
  const updatePropertyA = store.updatePropertyA;
  const updatePropertyB = store.updatePropertyB;
  const resetAll = store.resetAll;

  return (
    <div className="p-6 border-2 border-blue-500 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-600">自动订阅演示组件</h2>

      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded">
          <p className="text-sm text-gray-600">访问 propertyA（自动订阅）:</p>
          <p className="text-lg font-semibold">propertyA: {propertyA}</p>
        </div>

        <div className="p-3 bg-green-50 rounded">
          <p className="text-sm text-gray-600">访问 propertyB（自动订阅）:</p>
          <p className="text-lg font-semibold">propertyB: {propertyB}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={updatePropertyA} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            更新 Property A
          </button>

          <button onClick={updatePropertyB} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            更新 Property B
          </button>

          <button onClick={resetAll} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
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
