import { observerStore, StoreWithSubscription } from "@/libs/observerStore";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  isActive: boolean;
  createdAt: Date;
}

interface UserStats {
  total: number;
  active: number;
  inactive: number;
  averageAge: number;
  departmentCounts: Record<string, number>;
}

interface FilterOptions {
  searchText: string;
  selectedDepartment: string;
  showActiveOnly: boolean;
  ageRange: { min: number; max: number };
}

class ComplexStore {
  users: User[] = [
    {
      id: 1,
      name: "张三",
      email: "zhangsan@example.com",
      age: 25,
      department: "技术部",
      isActive: true,
      createdAt: new Date("2023-01-15"),
    },
    {
      id: 2,
      name: "李四",
      email: "lisi@example.com",
      age: 30,
      department: "市场部",
      isActive: true,
      createdAt: new Date("2023-02-20"),
    },
    {
      id: 3,
      name: "王五",
      email: "wangwu@example.com",
      age: 28,
      department: "技术部",
      isActive: false,
      createdAt: new Date("2023-03-10"),
    },
    {
      id: 4,
      name: "赵六",
      email: "zhaoliu@example.com",
      age: 35,
      department: "人事部",
      isActive: true,
      createdAt: new Date("2023-04-05"),
    },
  ];

  statistics: UserStats = {
    total: 0,
    active: 0,
    inactive: 0,
    averageAge: 0,
    departmentCounts: {},
  };

  filters: FilterOptions = {
    searchText: "",
    selectedDepartment: "",
    showActiveOnly: false,
    ageRange: { min: 0, max: 100 },
  };

  uiState = {
    isLoading: false,
    selectedUserId: null as number | null,
    showModal: false,
    lastUpdateTime: new Date(),
  };

  notifications: string[] = [];

  addUser(userData: Omit<User, "id" | "createdAt">) {
    const newUser: User = {
      ...userData,
      id: Math.max(...this.users.map((u) => u.id), 0) + 1,
      createdAt: new Date(),
    };
    this.users.push(newUser);
    this.updateStatistics();
    this.addNotification(`用户 ${newUser.name} 已添加`);
  }

  removeUser(id: number) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex >= 0) {
      const userName = this.users[userIndex].name;
      this.users.splice(userIndex, 1);
      this.updateStatistics();
      this.addNotification(`用户 ${userName} 已删除`);
    }
  }

  updateUser(id: number, updates: Partial<User>) {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex >= 0) {
      Object.assign(this.users[userIndex], updates);
      this.updateStatistics();
      this.addNotification(`用户 ${this.users[userIndex].name} 已更新`);
    }
  }

  toggleUserActive(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (user) {
      user.isActive = !user.isActive;
      this.updateStatistics();
      this.addNotification(`用户 ${user.name} 状态已切换为 ${user.isActive ? "激活" : "停用"}`);
    }
  }

  updateStatistics() {
    const total = this.users.length;
    const active = this.users.filter((u) => u.isActive).length;
    const inactive = total - active;
    const averageAge = total > 0 ? this.users.reduce((sum, u) => sum + u.age, 0) / total : 0;

    const departmentCounts: Record<string, number> = {};
    this.users.forEach((user) => {
      departmentCounts[user.department] = (departmentCounts[user.department] || 0) + 1;
    });

    this.statistics = {
      total,
      active,
      inactive,
      averageAge: Math.round(averageAge * 10) / 10,
      departmentCounts,
    };
  }

  setFilter<K extends keyof FilterOptions>(filterKey: K, value: FilterOptions[K]) {
    this.filters[filterKey] = value;
  }

  clearFilters() {
    this.filters = {
      searchText: "",
      selectedDepartment: "",
      showActiveOnly: false,
      ageRange: { min: 0, max: 100 },
    };
  }

  setLoading(loading: boolean) {
    this.uiState.isLoading = loading;
  }

  selectUser(id: number | null) {
    this.uiState.selectedUserId = id;
  }

  toggleModal() {
    this.uiState.showModal = !this.uiState.showModal;
  }

  addNotification(message: string) {
    this.notifications.push(message);
    this.uiState.lastUpdateTime = new Date();

    setTimeout(() => {
      const index = this.notifications.indexOf(message);
      if (index >= 0) {
        this.notifications.splice(index, 1);
      }
    }, 3000);
  }

  clearNotifications() {
    this.notifications = [];
  }

  getFilteredUsers() {
    return this.users.filter((user) => {
      const matchesSearch =
        !this.filters.searchText ||
        user.name.toLowerCase().includes(this.filters.searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(this.filters.searchText.toLowerCase());

      const matchesDepartment = !this.filters.selectedDepartment || user.department === this.filters.selectedDepartment;

      const matchesActive = !this.filters.showActiveOnly || user.isActive;

      const matchesAge = user.age >= this.filters.ageRange.min && user.age <= this.filters.ageRange.max;

      return matchesSearch && matchesDepartment && matchesActive && matchesAge;
    });
  }

  async batchUpdateUsers(ids: number[], updates: Partial<User>) {
    this.setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    ids.forEach((id) => {
      const userIndex = this.users.findIndex((u) => u.id === id);
      if (userIndex >= 0) {
        Object.assign(this.users[userIndex], updates);
      }
    });

    this.updateStatistics();
    this.addNotification(`批量更新了 ${ids.length} 个用户`);
    this.setLoading(false);
  }

  exportUsers() {
    const filteredUsers = this.getFilteredUsers();
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "ID,姓名,邮箱,年龄,部门,状态,创建时间\n" +
      filteredUsers
        .map(
          (user) =>
            `${user.id},${user.name},${user.email},${user.age},${user.department},${
              user.isActive ? "激活" : "停用"
            },${user.createdAt.toLocaleDateString()}`
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "users.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    this.addNotification("用户数据已导出");
  }

  constructor() {
    this.updateStatistics();
  }
}

export const complexStore = observerStore(new ComplexStore()) as StoreWithSubscription<ComplexStore>;
