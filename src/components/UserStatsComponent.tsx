"use client";

import { useStores } from "@/hooks/useStores";
import { complexStore } from "@/stores/complexStore";

export default function UserStatsComponent() {
  console.log("用户统计组件：重新渲染");

  const store = useStores(complexStore, "UserStats");
  const statistics = store.statistics;

  const departmentEntries = Object.entries(statistics.departmentCounts);

  return (
    <div className="p-6 border-2 border-purple-500 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-purple-600">用户统计组件 (只订阅统计数据)</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-blue-600">{statistics.total}</div>
          <div className="text-sm text-gray-600">总用户数</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-green-600">{statistics.active}</div>
          <div className="text-sm text-gray-600">激活用户</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-red-600">{statistics.inactive}</div>
          <div className="text-sm text-gray-600">停用用户</div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-yellow-600">{statistics.averageAge}</div>
          <div className="text-sm text-gray-600">平均年龄</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-purple-600">部门分布</h3>
        <div className="space-y-2">
          {departmentEntries.length === 0 ? (
            <div className="text-gray-500 text-center py-4">暂无部门数据</div>
          ) : (
            departmentEntries.map(([department, count]) => (
              <div key={department} className="flex justify-between items-center p-3 bg-purple-50 rounded">
                <span className="font-medium">{department}</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-purple-600">{count}</span>
                  <span className="text-sm text-gray-500">人</span>
                  <div className="w-20 bg-gray-200 rounded-full h-2 ml-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(count / statistics.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-400 w-8">{Math.round((count / statistics.total) * 100)}%</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">激活率</h4>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${statistics.total > 0 ? (statistics.active / statistics.total) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{statistics.total > 0 ? Math.round((statistics.active / statistics.total) * 100) : 0}%</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-700 mb-2">停用率</h4>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="bg-red-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${statistics.total > 0 ? (statistics.inactive / statistics.total) * 100 : 0}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{statistics.total > 0 ? Math.round((statistics.inactive / statistics.total) * 100) : 0}%</span>
          </div>
        </div>
      </div>

      <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
        <p>此组件只会在统计数据变化时重新渲染</p>
        <p>不会因为用户列表、过滤器、通知或UI状态变化而重新渲染</p>
      </div>
    </div>
  );
}
