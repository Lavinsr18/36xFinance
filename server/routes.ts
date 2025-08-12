import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginSchema } from "../shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Admin authentication
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const adminUser = await storage.getAdminUserByEmail(email);
      if (!adminUser || adminUser.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // In production, use proper session management
      const { password: _, ...userWithoutPassword } = adminUser;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input", errors: error.errors });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Dashboard stats
  app.get("/api/dashboard/stats", async (_req, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  // Users management
  app.get("/api/users", async (_req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.patch("/api/users/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const updatedUser = await storage.updateUserStatus(id, status);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user status" });
    }
  });

  // Transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
      const transactions = await storage.getTransactions(limit);
      
      // Join with user data
      const transactionsWithUsers = await Promise.all(
        transactions.map(async (transaction) => {
          const user = await storage.getUser(transaction.userId);
          return {
            ...transaction,
            user: user ? {
              id: user.id,
              username: user.username,
              email: user.email,
              fullName: user.fullName,
            } : null,
          };
        })
      );
      
      res.json(transactionsWithUsers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch transactions" });
    }
  });

  app.patch("/api/transactions/:id/status", async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const updatedTransaction = await storage.updateTransactionStatus(id, status);
      if (!updatedTransaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      
      res.json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ message: "Failed to update transaction status" });
    }
  });

  // Revenue chart data (mock data for charts)
  app.get("/api/dashboard/revenue-chart", async (_req, res) => {
    try {
      const data = [
        { month: "Jan", revenue: 65000 },
        { month: "Feb", revenue: 59000 },
        { month: "Mar", revenue: 80000 },
        { month: "Apr", revenue: 81000 },
        { month: "May", revenue: 56000 },
        { month: "Jun", revenue: 85000 },
      ];
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch revenue chart data" });
    }
  });

  // User activity chart data
  app.get("/api/dashboard/activity-chart", async (_req, res) => {
    try {
      const data = [
        { day: "Mon", users: 1200 },
        { day: "Tue", users: 1900 },
        { day: "Wed", users: 3000 },
        { day: "Thu", users: 5000 },
        { day: "Fri", users: 2000 },
        { day: "Sat", users: 3000 },
        { day: "Sun", users: 2500 },
      ];
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity chart data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
