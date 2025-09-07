// Simple auth utilities for the admin session
export interface AuthUser {
  username: string;
}

class AuthService {
  private readonly STORAGE_KEY = "36x_auth_user";

  // Check if user is authenticated
  isAuthenticated(): boolean {
    try {
      const user = localStorage.getItem(this.STORAGE_KEY);
      return !!user;
    } catch {
      return false;
    }
  }

  // Get current user
  getCurrentUser(): AuthUser | null {
    try {
      const user = localStorage.getItem(this.STORAGE_KEY);
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }

  // Set authenticated user
  setUser(user: AuthUser): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
    }
  }

  // Login function
  async login(username: string, password: string): Promise<{ success: boolean; message: string }> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        this.setUser({ username });
        return { success: true, message: "Login successful" };
      } else {
        return { success: false, message: data.message || "Login failed" };
      }
    } catch (error) {
      return { success: false, message: "Network error occurred" };
    }
  }

  // Logout function
  logout(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error("Failed to remove user from localStorage:", error);
    }
  }

  // Clear all auth data
  clearAuth(): void {
    this.logout();
  }
}

export const authService = new AuthService();

// Hook for React components
export function useAuth() {
  const isAuthenticated = authService.isAuthenticated();
  const currentUser = authService.getCurrentUser();

  return {
    isAuthenticated,
    currentUser,
    login: authService.login.bind(authService),
    logout: authService.logout.bind(authService),
    clearAuth: authService.clearAuth.bind(authService),
  };
}

// Auth guard utility
export function requireAuth(): AuthUser {
  const user = authService.getCurrentUser();
  if (!user) {
    throw new Error("Authentication required");
  }
  return user;
}

// Protected route wrapper
export function withAuth<T extends object>(
  Component: React.ComponentType<T>
): React.ComponentType<T> {
  return function ProtectedComponent(props: T) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      // Redirect to login or show unauthorized message
      window.location.href = "/admin-login";
      return null;
    }

    return <Component {...props} />;
  };
}
