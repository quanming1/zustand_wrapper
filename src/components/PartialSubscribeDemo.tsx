"use client";

import { useStore } from "@/hooks/useAutoSubscribeStore";
import { testStore } from "@/stores/testStore";

export default function PartialSubscribeDemo() {
  console.log("部分订阅演示组件：更新");
  const stores = useStore();
  const propertyA = stores.testStore.propertyA;
  const updatePropertyA = stores.testStore.updatePropertyA;
  const updatePropertyB = stores.testStore.updatePropertyB;

  return (
    <div className="p-6 border-2 border-purple-500 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-600">部分订阅演示组件</h2>

      <div className="space-y-4">
        <div className="p-3 bg-purple-50 rounded">
          <p className="text-sm text-gray-600">只访问 propertyA（只订阅这一个字段）:</p>
          <p className="text-lg font-semibold">propertyA: {propertyA}</p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={updatePropertyA} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
            更新 Property A（会触发重渲染）
          </button>

          <button onClick={updatePropertyB} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            更新 Property B（不会触发重渲染）
          </button>
        </div>

        <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
          <p>这个组件只访问了 propertyA，所以只订阅了这个字段</p>
          <p>点击&ldquo;更新 Property A&rdquo;会触发这个组件重新渲染</p>
          <p>点击&ldquo;更新 Property B&rdquo;不会触发这个组件重新渲染（因为没有订阅）</p>
        </div>
      </div>
    </div>
  );
}
