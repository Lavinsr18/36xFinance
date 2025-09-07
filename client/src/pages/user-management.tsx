import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertUserSchema, type User, type LoginHistory } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Users, 
  Shield, 
  Activity,
  Search,
  Calendar,
  Clock
} from "lucide-react";
import { z } from "zod";

const userFormSchema = insertUserSchema.extend({
  username: z.string().min(1, "Username is required").max(50, "Username is too long"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  role: z.enum(["admin", "user", "viewer"]),
  permissions: z.array(z.string()).default([]),
});

type UserFormData = z.infer<typeof userFormSchema>;

const AVAILABLE_PERMISSIONS = [
  { id: "blogs", label: "Blog Management" },
  { id: "videos", label: "Video Management" },
  { id: "contacts", label: "Contact Management" },
  { id: "enquiries", label: "Enquiry Management" },
  { id: "users", label: "User Management" },
  { id: "activities", label: "Activity Logs" },
];

export default function UserManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Fetch users
  const { data: users = [], isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["/api/users"],
  });

  // Fetch login history
  const { data: loginHistory = [], isLoading: historyLoading } = useQuery<LoginHistory[]>({
    queryKey: ["/api/login-history"],
  });

  // Create user mutation
  const createUserMutation = useMutation({
    mutationFn: async (userData: UserFormData) => {
      return apiRequest("/api/users", "POST", userData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setIsCreateDialogOpen(false);
      createForm.reset();
      toast({
        title: "Success",
        description: "User created successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    },
  });

  // Update user mutation
  const updateUserMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UserFormData> }) => {
      return apiRequest(`/api/users/${id}`, "PUT", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      setIsEditDialogOpen(false);
      setEditingUser(null);
      editForm.reset();
      toast({
        title: "Success",
        description: "User updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user",
        variant: "destructive",
      });
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest(`/api/users/${id}`, "DELETE");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Success",
        description: "User deleted successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    },
  });

  // Update user status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      return apiRequest(`/api/users/${id}/status`, "PUT", { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Success",
        description: "User status updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user status",
        variant: "destructive",
      });
    },
  });

  // Update permissions mutation
  const updatePermissionsMutation = useMutation({
    mutationFn: async ({ id, permissions }: { id: string; permissions: string[] }) => {
      return apiRequest(`/api/users/${id}/permissions`, "PUT", { permissions });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
      toast({
        title: "Success",
        description: "User permissions updated successfully!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update user permissions",
        variant: "destructive",
      });
    },
  });

  // Create form
  const createForm = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      role: "user",
      isActive: true,
      permissions: [],
    },
  });

  // Edit form
  const editForm = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema.omit({ password: true }).extend({
      password: z.string().optional(),
    })),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      role: "user",
      isActive: true,
      permissions: [],
    },
  });

  // Handle create user
  const handleCreateUser = (data: UserFormData) => {
    createUserMutation.mutate(data);
  };

  // Handle edit user
  const handleEditUser = (data: UserFormData) => {
    if (!editingUser) return;
    const updateData = { ...data };
    if (!updateData.password) {
      delete updateData.password;
    }
    updateUserMutation.mutate({ id: editingUser.id, data: updateData });
  };

  // Handle delete user
  const handleDeleteUser = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };

  // Handle status toggle
  const handleStatusToggle = (id: string, isActive: boolean) => {
    updateStatusMutation.mutate({ id, isActive });
  };

  // Handle permission change
  const handlePermissionChange = (userId: string, permissionId: string, checked: boolean) => {
    const user = users.find((u: User) => u.id === userId);
    if (!user) return;

    const currentPermissions = user.permissions || [];
    const newPermissions = checked
      ? [...currentPermissions, permissionId]
      : currentPermissions.filter((p: string) => p !== permissionId);

    updatePermissionsMutation.mutate({ id: userId, permissions: newPermissions });
  };

  // Open edit dialog
  const openEditDialog = (user: User) => {
    setEditingUser(user);
    editForm.reset({
      username: user.username,
      email: user.email || "",
      role: user.role as "admin" | "user" | "viewer",
      isActive: user.isActive,
      permissions: user.permissions || [],
    });
    setIsEditDialogOpen(true);
  };

  // Filter users based on search
  const filteredUsers = users.filter((user: User) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Format date
  const formatDate = (date: string | Date | null) => {
    if (!date) return "Never";
    return new Date(date).toLocaleString();
  };

  // Get role badge color
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
       case "admin":
      return "bg-red-100 text-red-800 border border-red-300";
    case "user":
      return "bg-blue-100 text-blue-800 border border-blue-300";
    case "viewer":
      return "bg-purple-100 text-purple-800 border border-purple-300";
    default:
      return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  return (
      <div className="space-y-6 bg-gradient-to-br from-indigo-50 via-white to-yellow-50 min-h-screen p-6 rounded-xl">
    {/* Header */}
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-indigo-700">User Management</h1>
        <p className="text-gray-600">
          Manage users, permissions, and login history
        </p>
      </div>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogTrigger asChild>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-md transition-all duration-300" data-testid="button-create-user">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-white shadow-xl rounded-xl" data-testid="dialog-create-user">
          <DialogHeader>
            <DialogTitle className="text-indigo-700">Create New User</DialogTitle>
          </DialogHeader>
          <form onSubmit={createForm.handleSubmit(handleCreateUser)} className="space-y-4">
            <div>
              <Label htmlFor="create-username">Username *</Label>
              <Input
                id="create-username"
                {...createForm.register("username")}
                className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                data-testid="input-create-username"
              />
              {createForm.formState.errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {createForm.formState.errors.username.message}
                </p>
              )}
            </div>

              <div>
              <Label htmlFor="create-password">Password *</Label>
              <Input
                id="create-password"
                type="password"
                {...createForm.register("password")}
                className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                data-testid="input-create-password"
              />
              {createForm.formState.errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {createForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="create-email">Email</Label>
              <Input
                id="create-email"
                type="email"
                {...createForm.register("email")}
                className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                data-testid="input-create-email"
              />
              {createForm.formState.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {createForm.formState.errors.email.message}
                </p>
              )}
            </div>

              <div>
              <Label htmlFor="create-role">Role *</Label>
              <Select
                value={createForm.watch("role")}
                onValueChange={(value) =>
                  createForm.setValue("role", value as "admin" | "user" | "viewer")
                }
              >
                <SelectTrigger className="mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500" data-testid="select-create-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="create-active"
                checked={createForm.watch("isActive")}
                onCheckedChange={(checked) => createForm.setValue("isActive", checked)}
                data-testid="switch-create-active"
              />
              <Label htmlFor="create-active">Active</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCreateDialogOpen(false)}
                className="border-gray-400 text-gray-600 hover:bg-gray-100"
                data-testid="button-cancel-create"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createUserMutation.isPending}
                className="bg-gradient-to-r from-green-500 to-yellow-500 hover:from-green-600 hover:to-yellow-600 text-white shadow-md transition-all"
                data-testid="button-submit-create"
              >
                {createUserMutation.isPending ? "Creating..." : "Create User"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>

     {/* Tabs */}
    <Tabs defaultValue="users" className="space-y-6">
      <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg">
        <TabsTrigger value="users" className="flex items-center space-x-2 text-indigo-700 hover:bg-indigo-200 rounded-md transition" data-testid="tab-users">
          <Users className="h-4 w-4" />
          <span>Users</span>
        </TabsTrigger>
        <TabsTrigger value="permissions" className="flex items-center space-x-2 text-purple-700 hover:bg-purple-200 rounded-md transition" data-testid="tab-permissions">
          <Shield className="h-4 w-4" />
          <span>Permissions</span>
        </TabsTrigger>
        <TabsTrigger value="history" className="flex items-center space-x-2 text-yellow-700 hover:bg-yellow-200 rounded-md transition" data-testid="tab-history">
          <Activity className="h-4 w-4" />
          <span>Login History</span>
        </TabsTrigger>
      </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          {/* Search */}
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
              data-testid="input-search-users"
            />
          </div>

          {/* Users Table */}
          <Card className="shadow-lg border border-purple-300 bg-gradient-to-br from-indigo-50 to-purple-100 animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-800">All Users</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-purple-200/60">
        <TableRow>
          <TableHead className="font-semibold text-purple-900">Username</TableHead>
          <TableHead className="font-semibold text-purple-900">Email</TableHead>
          <TableHead className="font-semibold text-purple-900">Role</TableHead>
          <TableHead className="font-semibold text-purple-900">Status</TableHead>
          <TableHead className="font-semibold text-purple-900">Last Login</TableHead>
          <TableHead className="font-semibold text-purple-900">Login Count</TableHead>
          <TableHead className="font-semibold text-purple-900">Actions</TableHead>
        </TableRow>
      </TableHeader>
                <TableBody>
                  {usersLoading ? (
                    <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-purple-600 animate-pulse">
              Loading users...
            </TableCell>
          </TableRow>
        ) : filteredUsers.length === 0 ? (
          <TableRow>
            <TableCell colSpan={7} className="text-center py-8 text-gray-500 italic">
              No users found
            </TableCell>
          </TableRow>
                  ) : (
                    filteredUsers.map((user: User) => (
                      <TableRow
              key={user.id}
              className="hover:bg-purple-50 transition-colors duration-300"
              data-testid={`row-user-${user.id}`}
            >
              <TableCell className="font-medium text-purple-900">{user.username}</TableCell>
              <TableCell className="text-gray-700">{user.email || "—"}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                    user.role
                  )}`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>
                           <Switch
                  checked={user.isActive}
                  onCheckedChange={(checked) => handleStatusToggle(user.id, checked)}
                  disabled={updateStatusMutation.isPending}
                  className="data-[state=checked]:bg-green-600"
                  data-testid={`switch-status-${user.id}`}
                />
              </TableCell>
              <TableCell className="text-gray-700">{formatDate(user.lastLogin)}</TableCell>
              <TableCell className="text-gray-700">{user.loginCount || 0}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(user)}
                    className="border-purple-400 text-purple-700 hover:bg-purple-100 transition"
                    data-testid={`button-edit-${user.id}`}
                  ><Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={deleteUserMutation.isPending}
                    className="border-red-400 text-red-600 hover:bg-red-100 transition"
                    data-testid={`button-delete-${user.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>

                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

    {/* Permissions Tab */}
<TabsContent value="permissions" className="space-y-4">
  <Card className="shadow-lg border border-purple-300 bg-gradient-to-br from-indigo-50 to-purple-100 animate-fade-in">
    <CardHeader>
      <CardTitle className="text-xl font-bold text-purple-800">👥 User Permissions</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader className="bg-purple-200/60">
          <TableRow>
            <TableHead className="font-semibold text-purple-900">User</TableHead>
            <TableHead className="font-semibold text-purple-900">Role</TableHead>
            {AVAILABLE_PERMISSIONS.map((permission) => (
              <TableHead key={permission.id} className="text-center text-purple-900 font-semibold">
                {permission.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersLoading ? (
            <TableRow>
              <TableCell
                colSpan={AVAILABLE_PERMISSIONS.length + 2}
                className="text-center py-8 text-purple-600 animate-pulse"
              >
                Loading users...
              </TableCell>
            </TableRow>
          ) : users.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={AVAILABLE_PERMISSIONS.length + 2}
                className="text-center py-8 text-gray-500 italic"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            users.map((user: User) => (
              <TableRow
                key={user.id}
                className="hover:bg-purple-50 transition-colors duration-300"
                data-testid={`row-permission-${user.id}`}
              >
                <TableCell className="font-medium text-purple-900">{user.username}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${getRoleBadgeColor(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                {AVAILABLE_PERMISSIONS.map((permission) => (
                  <TableCell key={permission.id} className="text-center">
                    <Checkbox
                      checked={user.permissions?.includes(permission.id) || false}
                      onCheckedChange={(checked) =>
                        handlePermissionChange(user.id, permission.id, checked as boolean)
                      }
                      disabled={updatePermissionsMutation.isPending}
                      className="accent-purple-600 scale-110 transition-transform duration-200 hover:scale-125"
                      data-testid={`checkbox-permission-${user.id}-${permission.id}`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
</TabsContent>

        {/* Login History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card className="shadow-lg border border-indigo-300 bg-gradient-to-br from-indigo-50 to-blue-100 animate-fade-in">
            <CardHeader>
              <CardTitle  className="text-xl font-bold text-indigo-800">Login History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-indigo-200/60">
          <TableRow>
            <TableHead className="text-indigo-900 font-semibold">Username</TableHead>
            <TableHead className="text-indigo-900 font-semibold">Login Time</TableHead>
            <TableHead className="text-indigo-900 font-semibold">IP Address</TableHead>
            <TableHead className="text-indigo-900 font-semibold">User Agent</TableHead>
          </TableRow>
        </TableHeader>
                <TableBody>
                  {historyLoading ? (
                    <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-indigo-600 animate-pulse">
                Loading login history...
              </TableCell>
            </TableRow>
          ) : loginHistory.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500 italic">
                No login history found
              </TableCell>
            </TableRow>
                  ) : (
                    loginHistory.map((entry: LoginHistory) => (
                       <TableRow
                key={entry.id}
                className="hover:bg-indigo-50 transition-colors duration-300"
                data-testid={`row-history-${entry.id}`}
              >
                <TableCell className="font-medium text-indigo-900">{entry.username}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-indigo-600" />
                    <span className="text-indigo-800">{formatDate(entry.loginTime)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-700">{entry.ipAddress}</TableCell>
                <TableCell
                  className="max-w-xs truncate text-gray-600"
                  title={entry.userAgent}
                >
                  {entry.userAgent}
                </TableCell>
              </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
<Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
  <DialogContent className="max-w-md bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl rounded-2xl animate-fade-in">
    <DialogHeader>
      <DialogTitle className="text-lg font-bold text-purple-800">✏️ Edit User</DialogTitle>
    </DialogHeader>
    <form onSubmit={editForm.handleSubmit(handleEditUser)} className="space-y-4">
      <div>
        <Label htmlFor="edit-username" className="text-purple-700">Username *</Label>
        <Input
          id="edit-username"
          {...editForm.register("username")}
          className="mt-1 border-purple-300 focus:ring-purple-500"
          data-testid="input-edit-username"
        />
        {editForm.formState.errors.username && (
          <p className="text-red-600 text-sm mt-1">{editForm.formState.errors.username.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="edit-password" className="text-purple-700">Password</Label>
        <Input
          id="edit-password"
          type="password"
          {...editForm.register("password")}
          className="mt-1 border-purple-300 focus:ring-purple-500"
          data-testid="input-edit-password"
        />
        {editForm.formState.errors.password && (
          <p className="text-red-600 text-sm mt-1">{editForm.formState.errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="edit-email" className="text-purple-700">Email</Label>
        <Input
          id="edit-email"
          type="email"
          {...editForm.register("email")}
          className="mt-1 border-purple-300 focus:ring-purple-500"
          data-testid="input-edit-email"
        />
        {editForm.formState.errors.email && (
          <p className="text-red-600 text-sm mt-1">{editForm.formState.errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="edit-role" className="text-purple-700">Role *</Label>
        <Select
          value={editForm.watch("role")}
          onValueChange={(value) => editForm.setValue("role", value as "admin" | "user" | "viewer")}
        >
          <SelectTrigger className="mt-1 border-purple-300 focus:ring-purple-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="edit-active"
          checked={editForm.watch("isActive")}
          onCheckedChange={(checked) => editForm.setValue("isActive", checked)}
          className="data-[state=checked]:bg-purple-600"
          data-testid="switch-edit-active"
        />
        <Label htmlFor="edit-active" className="text-purple-700">Active</Label>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsEditDialogOpen(false)}
          className="border-purple-400 text-purple-700 hover:bg-purple-100 transition"
          data-testid="button-cancel-edit"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={updateUserMutation.isPending}
          className="bg-purple-600 text-white hover:bg-purple-700 transition transform hover:scale-105"
          data-testid="button-submit-edit"
        >
          {updateUserMutation.isPending ? "Updating..." : "Update User"}
        </Button>
      </div>
    </form>
  </DialogContent>
</Dialog>
    </div>
  );
}