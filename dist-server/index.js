// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  loginHistory;
  blogs;
  videos;
  contacts;
  enquiryForms;
  activities;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.loginHistory = /* @__PURE__ */ new Map();
    this.blogs = /* @__PURE__ */ new Map();
    this.videos = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.enquiryForms = /* @__PURE__ */ new Map();
    this.activities = /* @__PURE__ */ new Map();
    const adminUser = {
      id: randomUUID(),
      username: "36xfinance",
      password: "36xfinance",
      email: "admin@36xfinance.com",
      role: "admin",
      isActive: true,
      permissions: ["blogs", "videos", "contacts", "enquiries", "users", "activities"],
      lastLogin: null,
      loginCount: "0",
      createdAt: /* @__PURE__ */ new Date(),
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.users.set(adminUser.id, adminUser);
    const defaultForm1 = {
      id: randomUUID(),
      title: "Business Registration",
      description: "Complete business registration and incorporation services with expert guidance throughout the process.",
      icon: "\u{1F4BC}",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      googleFormUrl: "https://forms.gle/eBrRUfpQHTu4A3Jk9",
      features: ["Company Registration", "Tax ID Application", "Legal Documentation"],
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    const defaultForm2 = {
      id: randomUUID(),
      title: "Tax Consultation",
      description: "Personalized tax planning and consultation services to optimize your tax strategy and compliance.",
      icon: "\u{1F4CA}",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
      googleFormUrl: "https://forms.gle/uepyC8iEHpUJcwsX6",
      features: ["Tax Planning Strategy", "Compliance Review", "Deduction Optimization"],
      isActive: true,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.enquiryForms.set(defaultForm1.id, defaultForm1);
    this.enquiryForms.set(defaultForm2.id, defaultForm2);
  }
  // Users
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async getAllUsers() {
    return Array.from(this.users.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const user = {
      ...insertUser,
      id,
      lastLogin: null,
      loginCount: "0",
      createdAt: now,
      updatedAt: now
    };
    this.users.set(id, user);
    await this.createActivity({
      type: "user",
      action: "created",
      title: `New user "${user.username}" was created`
    });
    return user;
  }
  async updateUser(id, updateUser) {
    const existing = this.users.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...updateUser,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, updated);
    await this.createActivity({
      type: "user",
      action: "updated",
      title: `User "${updated.username}" was updated`
    });
    return updated;
  }
  async deleteUser(id) {
    const user = this.users.get(id);
    if (!user) return false;
    this.users.delete(id);
    await this.createActivity({
      type: "user",
      action: "deleted",
      title: `User "${user.username}" was deleted`
    });
    return true;
  }
  async updateUserPermissions(id, permissions) {
    const existing = this.users.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      permissions,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, updated);
    await this.createActivity({
      type: "user",
      action: "updated",
      title: `Permissions updated for user "${updated.username}"`
    });
    return updated;
  }
  async updateUserStatus(id, isActive) {
    const existing = this.users.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      isActive,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, updated);
    await this.createActivity({
      type: "user",
      action: "updated",
      title: `User "${updated.username}" was ${isActive ? "activated" : "deactivated"}`
    });
    return updated;
  }
  async updateUserLogin(id, ipAddress, userAgent) {
    const existing = this.users.get(id);
    if (!existing) return;
    const loginCount = (parseInt(existing.loginCount || "0") + 1).toString();
    const updated = {
      ...existing,
      lastLogin: /* @__PURE__ */ new Date(),
      loginCount,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.users.set(id, updated);
    await this.createLoginHistory({
      userId: id,
      username: existing.username,
      ipAddress: ipAddress || "127.0.0.1",
      userAgent: userAgent || "Unknown"
    });
  }
  // Login History
  async getAllLoginHistory() {
    return Array.from(this.loginHistory.values()).sort(
      (a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime()
    );
  }
  async getUserLoginHistory(userId) {
    return Array.from(this.loginHistory.values()).filter((entry) => entry.userId === userId).sort(
      (a, b) => new Date(b.loginTime).getTime() - new Date(a.loginTime).getTime()
    );
  }
  async createLoginHistory(insertLoginHistory) {
    const id = randomUUID();
    const loginHistory2 = {
      ...insertLoginHistory,
      id,
      loginTime: /* @__PURE__ */ new Date()
    };
    this.loginHistory.set(id, loginHistory2);
    return loginHistory2;
  }
  // Blogs
  async getAllBlogs() {
    return Array.from(this.blogs.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getBlog(id) {
    return this.blogs.get(id);
  }
  async createBlog(insertBlog) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const blog = {
      ...insertBlog,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.blogs.set(id, blog);
    await this.createActivity({
      type: "blog",
      action: "created",
      title: `New blog "${blog.title}" was created`
    });
    return blog;
  }
  async updateBlog(id, updateBlog) {
    const existing = this.blogs.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...updateBlog,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.blogs.set(id, updated);
    await this.createActivity({
      type: "blog",
      action: "updated",
      title: `Blog "${updated.title}" was updated`
    });
    return updated;
  }
  async deleteBlog(id) {
    const blog = this.blogs.get(id);
    if (!blog) return false;
    this.blogs.delete(id);
    await this.createActivity({
      type: "blog",
      action: "deleted",
      title: `Blog "${blog.title}" was deleted`
    });
    return true;
  }
  async searchBlogs(query) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.blogs.values()).filter(
      (blog) => blog.title.toLowerCase().includes(lowercaseQuery) || blog.content.toLowerCase().includes(lowercaseQuery) || blog.category.toLowerCase().includes(lowercaseQuery)
    );
  }
  // Videos
  async getAllVideos() {
    return Array.from(this.videos.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getVideo(id) {
    return this.videos.get(id);
  }
  async createVideo(insertVideo) {
    const id = randomUUID();
    const video = {
      ...insertVideo,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.videos.set(id, video);
    await this.createActivity({
      type: "video",
      action: "created",
      title: `New video "${video.title}" was added`
    });
    return video;
  }
  async updateVideo(id, updateVideo) {
    const existing = this.videos.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updateVideo };
    this.videos.set(id, updated);
    await this.createActivity({
      type: "video",
      action: "updated",
      title: `Video "${updated.title}" was updated`
    });
    return updated;
  }
  async deleteVideo(id) {
    const video = this.videos.get(id);
    if (!video) return false;
    this.videos.delete(id);
    await this.createActivity({
      type: "video",
      action: "deleted",
      title: `Video "${video.title}" was deleted`
    });
    return true;
  }
  async searchVideos(query) {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.videos.values()).filter(
      (video) => video.title.toLowerCase().includes(lowercaseQuery) || video.description.toLowerCase().includes(lowercaseQuery)
    );
  }
  // Contacts
  async getAllContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    await this.createActivity({
      type: "contact",
      action: "created",
      title: `New contact message from ${contact.firstName} ${contact.lastName}`
    });
    return contact;
  }
  // Enquiry Forms
  async getAllEnquiryForms() {
    return Array.from(this.enquiryForms.values()).filter((form) => form.isActive);
  }
  async getEnquiryForm(id) {
    return this.enquiryForms.get(id);
  }
  async createEnquiryForm(insertForm) {
    const id = randomUUID();
    const form = {
      ...insertForm,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.enquiryForms.set(id, form);
    await this.createActivity({
      type: "enquiry",
      action: "created",
      title: `New enquiry form "${form.title}" was created`
    });
    return form;
  }
  async updateEnquiryForm(id, updateForm) {
    const existing = this.enquiryForms.get(id);
    if (!existing) return void 0;
    const updated = { ...existing, ...updateForm };
    this.enquiryForms.set(id, updated);
    await this.createActivity({
      type: "enquiry",
      action: "updated",
      title: `Enquiry form "${updated.title}" was updated`
    });
    return updated;
  }
  async deleteEnquiryForm(id) {
    const form = this.enquiryForms.get(id);
    if (!form) return false;
    this.enquiryForms.delete(id);
    await this.createActivity({
      type: "enquiry",
      action: "deleted",
      title: `Enquiry form "${form.title}" was deleted`
    });
    return true;
  }
  // Activities
  async getAllActivities() {
    return Array.from(this.activities.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 10);
  }
  async createActivity(insertActivity) {
    const id = randomUUID();
    const activity = {
      ...insertActivity,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.activities.set(id, activity);
    return activity;
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  role: text("role").notNull().default("admin"),
  // admin, user, viewer
  isActive: boolean("is_active").default(true),
  permissions: json("permissions").$type().default([]),
  // dashboard sections access
  lastLogin: timestamp("last_login"),
  loginCount: text("login_count").default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var loginHistory = pgTable("login_history", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  username: text("username").notNull(),
  loginTime: timestamp("login_time").defaultNow(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent")
});
var blogs = pgTable("blogs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  image: text("image"),
  category: text("category").notNull(),
  status: text("status").notNull().default("published"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow()
});
var videos = pgTable("videos", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  youtubeUrl: text("youtube_url").notNull(),
  thumbnail: text("thumbnail"),
  duration: text("duration"),
  views: text("views").default("0"),
  createdAt: timestamp("created_at").defaultNow()
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var enquiryForms = pgTable("enquiry_forms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  image: text("image"),
  googleFormUrl: text("google_form_url").notNull(),
  features: json("features").$type(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow()
});
var activities = pgTable("activities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  type: text("type").notNull(),
  // blog, video, contact, enquiry
  action: text("action").notNull(),
  // created, updated, deleted
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLogin: true,
  loginCount: true
});
var insertLoginHistorySchema = createInsertSchema(loginHistory).omit({
  id: true,
  loginTime: true
});
var insertBlogSchema = createInsertSchema(blogs).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});
var insertVideoSchema = createInsertSchema(videos).omit({
  id: true,
  createdAt: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
});
var insertEnquiryFormSchema = createInsertSchema(enquiryForms).omit({
  id: true,
  createdAt: true
});
var insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      if (!user.isActive) {
        return res.status(401).json({ success: false, message: "Account is disabled" });
      }
      if (user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      const ipAddress = req.ip || req.connection.remoteAddress || "127.0.0.1";
      const userAgent = req.get("User-Agent") || "Unknown";
      await storage.updateUserLogin(user.id, ipAddress, userAgent);
      res.json({
        success: true,
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          permissions: user.permissions
        }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  app2.get("/api/users", async (req, res) => {
    try {
      const users2 = await storage.getAllUsers();
      res.json(users2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });
  app2.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  app2.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create user" });
    }
  });
  app2.put("/api/users/:id", async (req, res) => {
    try {
      const userData = insertUserSchema.partial().parse(req.body);
      const user = await storage.updateUser(req.params.id, userData);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid user data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update user" });
    }
  });
  app2.delete("/api/users/:id", async (req, res) => {
    try {
      const success = await storage.deleteUser(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete user" });
    }
  });
  app2.put("/api/users/:id/permissions", async (req, res) => {
    try {
      const { permissions } = req.body;
      if (!Array.isArray(permissions)) {
        return res.status(400).json({ message: "Permissions must be an array" });
      }
      const user = await storage.updateUserPermissions(req.params.id, permissions);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user permissions" });
    }
  });
  app2.put("/api/users/:id/status", async (req, res) => {
    try {
      const { isActive } = req.body;
      if (typeof isActive !== "boolean") {
        return res.status(400).json({ message: "isActive must be a boolean" });
      }
      const user = await storage.updateUserStatus(req.params.id, isActive);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user status" });
    }
  });
  app2.get("/api/login-history", async (req, res) => {
    try {
      const { userId } = req.query;
      let history;
      if (userId && typeof userId === "string") {
        history = await storage.getUserLoginHistory(userId);
      } else {
        history = await storage.getAllLoginHistory();
      }
      res.json(history);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch login history" });
    }
  });
  app2.get("/api/blogs", async (req, res) => {
    try {
      const { search } = req.query;
      let blogs2;
      if (search && typeof search === "string") {
        blogs2 = await storage.searchBlogs(search);
      } else {
        blogs2 = await storage.getAllBlogs();
      }
      res.json(blogs2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });
  app2.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlog(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });
  app2.post("/api/blogs", async (req, res) => {
    try {
      const blogData = insertBlogSchema.parse(req.body);
      const blog = await storage.createBlog(blogData);
      res.status(201).json(blog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create blog" });
    }
  });
  app2.put("/api/blogs/:id", async (req, res) => {
    try {
      const blogData = insertBlogSchema.partial().parse(req.body);
      const blog = await storage.updateBlog(req.params.id, blogData);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid blog data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update blog" });
    }
  });
  app2.delete("/api/blogs/:id", async (req, res) => {
    try {
      const success = await storage.deleteBlog(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ message: "Blog deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete blog" });
    }
  });
  app2.get("/api/videos", async (req, res) => {
    try {
      const { search } = req.query;
      let videos2;
      if (search && typeof search === "string") {
        videos2 = await storage.searchVideos(search);
      } else {
        videos2 = await storage.getAllVideos();
      }
      res.json(videos2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch videos" });
    }
  });
  app2.get("/api/videos/:id", async (req, res) => {
    try {
      const video = await storage.getVideo(req.params.id);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch video" });
    }
  });
  app2.post("/api/videos", async (req, res) => {
    try {
      const videoData = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(videoData);
      res.status(201).json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create video" });
    }
  });
  app2.put("/api/videos/:id", async (req, res) => {
    try {
      const videoData = insertVideoSchema.partial().parse(req.body);
      const video = await storage.updateVideo(req.params.id, videoData);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid video data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update video" });
    }
  });
  app2.delete("/api/videos/:id", async (req, res) => {
    try {
      const success = await storage.deleteVideo(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Video not found" });
      }
      res.json({ message: "Video deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete video" });
    }
  });
  app2.get("/api/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getAllContacts();
      res.json(contacts2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });
  app2.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create contact" });
    }
  });
  app2.get("/api/enquiry-forms", async (req, res) => {
    try {
      const forms = await storage.getAllEnquiryForms();
      res.json(forms);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch enquiry forms" });
    }
  });
  app2.post("/api/enquiry-forms", async (req, res) => {
    try {
      const formData = insertEnquiryFormSchema.parse(req.body);
      const form = await storage.createEnquiryForm(formData);
      res.status(201).json(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create enquiry form" });
    }
  });
  app2.put("/api/enquiry-forms/:id", async (req, res) => {
    try {
      const formData = insertEnquiryFormSchema.partial().parse(req.body);
      const form = await storage.updateEnquiryForm(req.params.id, formData);
      if (!form) {
        return res.status(404).json({ message: "Enquiry form not found" });
      }
      res.json(form);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid form data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update enquiry form" });
    }
  });
  app2.delete("/api/enquiry-forms/:id", async (req, res) => {
    try {
      const success = await storage.deleteEnquiryForm(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Enquiry form not found" });
      }
      res.json({ message: "Enquiry form deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete enquiry form" });
    }
  });
  app2.get("/api/activities", async (req, res) => {
    try {
      const activities2 = await storage.getAllActivities();
      res.json(activities2);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });
  app2.get("/api/export/contacts", async (req, res) => {
    try {
      const contacts2 = await storage.getAllContacts();
      const csvHeader = "First Name,Last Name,Email,Phone,Subject,Message,Date\n";
      const csvRows = contacts2.map(
        (contact) => `"${contact.firstName}","${contact.lastName}","${contact.email}","${contact.phone || ""}","${contact.subject}","${contact.message}","${contact.createdAt?.toISOString() || ""}"`
      ).join("\n");
      const csv = csvHeader + csvRows;
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", 'attachment; filename="contacts.csv"');
      res.send(csv);
    } catch (error) {
      res.status(500).json({ message: "Failed to export contacts" });
    }
  });
  app2.get("/api/export/enquiries", async (req, res) => {
    try {
      const forms = await storage.getAllEnquiryForms();
      const csvHeader = "Title,Description,Google Form URL,Features,Status,Created Date\n";
      const csvRows = forms.map(
        (form) => `"${form.title}","${form.description}","${form.googleFormUrl}","${form.features?.join("; ") || ""}","${form.isActive ? "Active" : "Inactive"}","${form.createdAt?.toISOString() || ""}"`
      ).join("\n");
      const csv = csvHeader + csvRows;
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", 'attachment; filename="enquiry-forms.csv"');
      res.send(csv);
    } catch (error) {
      res.status(500).json({ message: "Failed to export enquiry forms" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import path from "path";
import express from "express";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
async function setupVite(app2, server) {
  const vite = await import("vite");
  const viteServer = await vite.createServer({
    server: { middlewareMode: true },
    appType: "custom"
  });
  app2.use(viteServer.middlewares);
  return server;
}
function log(msg) {
  console.log(`[server] ${msg}`);
}

// server/index.ts
import path2 from "path";
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    const __dirname1 = path2.resolve();
    app.use(express2.static(path2.join(__dirname1, "client", "dist")));
    app.get("*", (_req, res) => {
      res.sendFile(path2.join(__dirname1, "client", "dist", "index.html"));
    });
  }
  const basePort = parseInt(process.env.PORT || "5000", 10);
  function tryListen(port) {
    const listenOptions = { port, host: "0.0.0.0" };
    if (process.platform !== "win32") listenOptions.reusePort = true;
    server.listen(listenOptions, () => {
      log(`\u2705 Server is running on port ${port}`);
    }).on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        log(`\u26A0\uFE0F Port ${port} in use, trying ${port + 1}...`);
        tryListen(port + 1);
      } else {
        log("\u274C Server failed to start:", err);
        process.exit(1);
      }
    });
  }
  tryListen(basePort);
})();
