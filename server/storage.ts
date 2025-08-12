import { 
  type AdminUser, 
  type InsertAdminUser, 
  type User, 
  type InsertUser,
  type Transaction,
  type InsertTransaction,
  type DashboardStats
} from "../shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Admin users
  getAdminUser(id: string): Promise<AdminUser | undefined>;
  getAdminUserByEmail(email: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;

  // Users
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStatus(id: string, status: string): Promise<User | undefined>;

  // Transactions
  getTransactions(limit?: number): Promise<Transaction[]>;
  getTransaction(id: string): Promise<Transaction | undefined>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  updateTransactionStatus(id: string, status: string): Promise<Transaction | undefined>;

  // Dashboard stats
  getDashboardStats(): Promise<DashboardStats>;
  updateDashboardStats(stats: Partial<DashboardStats>): Promise<DashboardStats>;
}

export class MemStorage implements IStorage {
  private adminUsers: Map<string, AdminUser>;
  private users: Map<string, User>;
  private transactions: Map<string, Transaction>;
  private dashboardStats: DashboardStats;

  constructor() {
    this.adminUsers = new Map();
    this.users = new Map();
    this.transactions = new Map();
    
    // Initialize with default admin user
    const defaultAdmin: AdminUser = {
      id: randomUUID(),
      email: "admin@36xfinance.com",
      password: "admin123", // In production, this should be hashed
      name: "Admin User",
      role: "admin",
      createdAt: new Date(),
    };
    this.adminUsers.set(defaultAdmin.id, defaultAdmin);

    // Initialize dashboard stats
    this.dashboardStats = {
      id: randomUUID(),
      totalUsers: 24563,
      totalRevenue: "2847291.00",
      activeTransactions: 1429,
      successRate: "98.70",
      updatedAt: new Date(),
    };

    // Add some sample users and transactions for dashboard
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample users
    const sampleUsers: User[] = [
      {
        id: randomUUID(),
        username: "johndoe",
        email: "john@example.com",
        fullName: "John Doe",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        username: "sarahmiller",
        email: "sarah@example.com",
        fullName: "Sarah Miller",
        status: "active",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        username: "robertjohnson",
        email: "robert@example.com",
        fullName: "Robert Johnson",
        status: "active",
        createdAt: new Date(),
      },
    ];

    sampleUsers.forEach(user => this.users.set(user.id, user));

    // Sample transactions
    const sampleTransactions: Transaction[] = [
      {
        id: "TXN001234",
        userId: sampleUsers[0].id,
        amount: "2547.00",
        type: "deposit",
        status: "completed",
        description: "Account funding",
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "TXN001235",
        userId: sampleUsers[1].id,
        amount: "1892.50",
        type: "withdrawal",
        status: "pending",
        description: "Withdrawal request",
        createdAt: new Date("2024-01-15"),
      },
      {
        id: "TXN001236",
        userId: sampleUsers[2].id,
        amount: "756.25",
        type: "transfer",
        status: "failed",
        description: "Transfer to external account",
        createdAt: new Date("2024-01-14"),
      },
    ];

    sampleTransactions.forEach(transaction => this.transactions.set(transaction.id, transaction));
  }

  // Admin users
  async getAdminUser(id: string): Promise<AdminUser | undefined> {
    return this.adminUsers.get(id);
  }

  async getAdminUserByEmail(email: string): Promise<AdminUser | undefined> {
    return Array.from(this.adminUsers.values()).find(user => user.email === email);
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const id = randomUUID();
    const user: AdminUser = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.adminUsers.set(id, user);
    return user;
  }

  // Users
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values()).sort((a, b) => 
      b.createdAt!.getTime() - a.createdAt!.getTime()
    );
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserStatus(id: string, status: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.status = status;
      this.users.set(id, user);
    }
    return user;
  }

  // Transactions
  async getTransactions(limit = 50): Promise<Transaction[]> {
    const transactions = Array.from(this.transactions.values())
      .sort((a, b) => b.createdAt!.getTime() - a.createdAt!.getTime());
    
    return limit ? transactions.slice(0, limit) : transactions;
  }

  async getTransaction(id: string): Promise<Transaction | undefined> {
    return this.transactions.get(id);
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = randomUUID();
    const transaction: Transaction = { 
      ...insertTransaction, 
      id, 
      createdAt: new Date() 
    };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async updateTransactionStatus(id: string, status: string): Promise<Transaction | undefined> {
    const transaction = this.transactions.get(id);
    if (transaction) {
      transaction.status = status;
      this.transactions.set(id, transaction);
    }
    return transaction;
  }

  // Dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    return this.dashboardStats;
  }

  async updateDashboardStats(updates: Partial<DashboardStats>): Promise<DashboardStats> {
    this.dashboardStats = {
      ...this.dashboardStats,
      ...updates,
      updatedAt: new Date(),
    };
    return this.dashboardStats;
  }
}

export const storage = new MemStorage();
