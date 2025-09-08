"use client";

import { useStores } from "@/hooks/useStores";
import { complexStore } from "@/stores/complexStore";

export default function UserListComponent() {
  console.log("用户列表组件：重新渲染");

  const store = useStores(complexStore, "UserList");
  const users = store.users;
  const filters = store.filters;
  const getFilteredUsers = store.getFilteredUsers;
  const selectUser = store.selectUser;
  const selectedUserId = store.uiState.selectedUserId;

  const filteredUsers = getFilteredUsers();

  return (
    <div className="p-6 border-2 border-green-500 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-green-600">用户列表组件 (只订阅用户数据)</h2>

      <div className="mb-4 p-3 bg-green-50 rounded">
        <p className="text-sm text-gray-600">
          当前过滤器: 搜索=&quot;{filters.searchText}&quot;, 部门=&quot;{filters.selectedDepartment}&quot;, 只显示激活=
          {filters.showActiveOnly ? "是" : "否"}
        </p>
        <p className="text-sm text-gray-600">
          显示 {filteredUsers.length} / {users.length} 个用户
        </p>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-500">没有找到符合条件的用户</div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedUserId === user.id ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-green-300"
              }`}
              onClick={() => selectUser(user.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm text-gray-500">年龄: {user.age}</span>
                    <span className="text-sm text-gray-500">部门: {user.department}</span>
                    <span className="text-sm text-gray-500">创建: {user.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 rounded text-sm ${user.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {user.isActive ? "激活" : "停用"}
                  </span>
                  <span className="text-xs text-gray-400">ID: {user.id}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded">
        <p>此组件只会在用户数据、过滤器或选中状态变化时重新渲染</p>
        <p>不会因为统计数据、通知或加载状态变化而重新渲染</p>
      </div>
    </div>
  );
}
