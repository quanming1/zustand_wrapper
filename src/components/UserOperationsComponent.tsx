"use client";

import { useStores } from "@/hooks/useStores";
import { complexStore } from "@/stores/complexStore";
import { useState } from "react";

export default function UserOperationsComponent() {
  console.log("用户操作组件：重新渲染");

  const store = useStores(complexStore, "UserOperations");
  const addUser = store.addUser;
  const removeUser = store.removeUser;
  const updateUser = store.updateUser;
  const toggleUserActive = store.toggleUserActive;
  const setFilter = store.setFilter;
  const clearFilters = store.clearFilters;
  const batchUpdateUsers = store.batchUpdateUsers;
  const exportUsers = store.exportUsers;

  const [newUserForm, setNewUserForm] = useState({
    name: "",
    email: "",
    age: 25,
    department: "技术部",
    isActive: true,
  });

  const [filterForm, setFilterForm] = useState({
    searchText: "",
    selectedDepartment: "",
    showActiveOnly: false,
  });

  const handleAddUser = () => {
    if (!newUserForm.name.trim() || !newUserForm.email.trim()) {
      alert("请填写用户姓名和邮箱");
      return;
    }

    addUser(newUserForm);
    setNewUserForm({
      name: "",
      email: "",
      age: 25,
      department: "技术部",
      isActive: true,
    });
  };

  const handleQuickActions = async () => {
    const userIds = [1, 2];
    await batchUpdateUsers(userIds, { department: "新部门" });
  };

  const departments = ["技术部", "市场部", "人事部", "财务部", "运营部"];

  return (
    <div className="p-6 border-2 border-orange-500 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-orange-600">用户操作组件 (不订阅数据)</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-orange-600">添加新用户</h3>
          <div className="space-y-3 p-4 bg-orange-50 rounded-lg">
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="姓名"
                value={newUserForm.name}
                onChange={(e) => setNewUserForm((prev) => ({ ...prev, name: e.target.value }))}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <input
                type="email"
                placeholder="邮箱"
                value={newUserForm.email}
                onChange={(e) => setNewUserForm((prev) => ({ ...prev, email: e.target.value }))}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="年龄"
                value={newUserForm.age}
                onChange={(e) => setNewUserForm((prev) => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <select
                value={newUserForm.department}
                onChange={(e) => setNewUserForm((prev) => ({ ...prev, department: e.target.value }))}
                className="px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={newUserForm.isActive}
                onChange={(e) => setNewUserForm((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-sm">
                激活状态
              </label>
            </div>
            <button onClick={handleAddUser} className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
              添加用户
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-orange-600">过滤器控制</h3>
          <div className="space-y-3 p-4 bg-orange-50 rounded-lg">
            <input
              type="text"
              placeholder="搜索用户姓名或邮箱..."
              value={filterForm.searchText}
              onChange={(e) => {
                setFilterForm((prev) => ({ ...prev, searchText: e.target.value }));
                setFilter("searchText", e.target.value);
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <select
              value={filterForm.selectedDepartment}
              onChange={(e) => {
                setFilterForm((prev) => ({ ...prev, selectedDepartment: e.target.value }));
                setFilter("selectedDepartment", e.target.value);
              }}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              <option value="">所有部门</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="showActiveOnly"
                checked={filterForm.showActiveOnly}
                onChange={(e) => {
                  setFilterForm((prev) => ({ ...prev, showActiveOnly: e.target.checked }));
                  setFilter("showActiveOnly", e.target.checked);
                }}
                className="w-4 h-4"
              />
              <label htmlFor="showActiveOnly" className="text-sm">
                只显示激活用户
              </label>
            </div>
            <button
              onClick={() => {
                clearFilters();
                setFilterForm({
                  searchText: "",
                  selectedDepartment: "",
                  showActiveOnly: false,
                });
              }}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              清除过滤器
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h3 className="text-lg font-semibold text-orange-600">快速操作</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => removeUser(1)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
            删除用户1
          </button>
          <button onClick={() => toggleUserActive(2)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            切换用户2状态
          </button>
          <button
            onClick={() => updateUser(3, { name: "更新后的王五", age: 30 })}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            更新用户3
          </button>
          <button onClick={handleQuickActions} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
            批量更新
          </button>
          <button onClick={exportUsers} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors">
            导出数据
          </button>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded">
        <p>此组件永远不会因为store数据变化而重新渲染</p>
        <p>只有当组件内部的state（表单数据）变化时才会重新渲染</p>
        <p>证明了useStores的精确订阅机制</p>
      </div>
    </div>
  );
}
