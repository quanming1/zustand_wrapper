"use client";

import { useStores } from "@/hooks/useStores";
import { complexStore } from "@/stores/complexStore";
import UserListComponent from "./UserListComponent";
import UserStatsComponent from "./UserStatsComponent";
import UserOperationsComponent from "./UserOperationsComponent";
import NotificationComponent from "./NotificationComponent";

export default function ComplexStoreDemo() {
  console.log("主Demo组件：重新渲染");

  const store = useStores(complexStore, "MainDemo");
  const isLoading = store.uiState.isLoading;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">useStores 复杂场景演示</h1>
        <p className="text-gray-600">验证 useStores 的精确订阅机制 - 每个组件只会在其订阅的数据变化时重新渲染</p>
        {isLoading && <div className="mt-3 p-2 bg-blue-100 text-blue-700 rounded">正在加载中...</div>}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2">
          <UserListComponent />
        </div>
        <div>
          <UserStatsComponent />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <div className="lg:col-span-3">
          <UserOperationsComponent />
        </div>
        <div>
          <NotificationComponent />
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-700 mb-4">测试说明</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">组件订阅情况：</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • <strong>用户列表组件</strong>: 订阅 users, filters, uiState.selectedUserId
              </li>
              <li>
                • <strong>用户统计组件</strong>: 只订阅 statistics
              </li>
              <li>
                • <strong>用户操作组件</strong>: 不订阅任何数据，只使用方法
              </li>
              <li>
                • <strong>通知组件</strong>: 订阅 notifications, uiState.lastUpdateTime
              </li>
              <li>
                • <strong>主Demo组件</strong>: 只订阅 uiState.isLoading
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">测试步骤：</h3>
            <ol className="text-sm text-gray-600 space-y-1">
              <li>1. 打开浏览器控制台查看渲染日志</li>
              <li>2. 尝试添加、删除、修改用户</li>
              <li>3. 使用过滤器功能</li>
              <li>4. 观察哪些组件重新渲染</li>
              <li>5. 验证各组件只在相关数据变化时渲染</li>
            </ol>
          </div>
        </div>
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm text-yellow-800">
            <strong>预期结果：</strong> 操作用户数据时，统计组件和通知组件会重新渲染，但操作组件不会；
            使用过滤器时，只有用户列表组件重新渲染；批量操作时主组件会因为loading状态变化而重新渲染。
          </p>
        </div>
      </div>
    </div>
  );
}
