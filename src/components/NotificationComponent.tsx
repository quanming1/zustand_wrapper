"use client";

import { useStores } from "@/hooks/useStores";
import { complexStore } from "@/stores/complexStore";

export default function NotificationComponent() {
  console.log("通知组件：重新渲染");

  const store = useStores(complexStore, "Notifications");
  const notifications = store.notifications;
  const clearNotifications = store.clearNotifications;
  const lastUpdateTime = store.uiState.lastUpdateTime;

  return (
    <div className="p-4 border-2 border-yellow-500 rounded-lg">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-yellow-600">通知中心 ({notifications.length})</h3>
        {notifications.length > 0 && (
          <button onClick={clearNotifications} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600">
            清除所有
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-32 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">暂无通知</div>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} className="p-2 bg-yellow-50 border border-yellow-200 rounded text-sm">
              {notification}
            </div>
          ))
        )}
      </div>

      <div className="mt-3 text-xs text-gray-500">最后更新: {lastUpdateTime.toLocaleTimeString()}</div>

      <div className="mt-2 text-xs text-gray-500 bg-gray-50 p-2 rounded">此组件只会在通知或更新时间变化时重新渲染</div>
    </div>
  );
}
