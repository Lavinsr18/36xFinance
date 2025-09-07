import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import BlogForm from "@/components/blog-form";
import VideoForm from "@/components/video-form";
import EnquiryForm from "@/components/enquiry-form";
import UserManagement from "../pages/user-management"
import type { Blog, Video, Contact, Activity, EnquiryForm as EnquiryFormType } from "@shared/schema";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [activeContentTab, setActiveContentTab] = useState("blogs");
  const [isAddingBlog, setIsAddingBlog] = useState(false);
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [isAddingEnquiry, setIsAddingEnquiry] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [editingEnquiry, setEditingEnquiry] = useState<EnquiryFormType | null>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: blogs = [], isLoading: blogsLoading } = useQuery({
    queryKey: ["/api/blogs"],
  });

  const { data: videos = [], isLoading: videosLoading } = useQuery({
    queryKey: ["/api/videos"],
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ["/api/contacts"],
  });

  const { data: activities = [], isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/activities"],
  });

  const { data: enquiryForms = [], isLoading: enquiryFormsLoading } = useQuery({
    queryKey: ["/api/enquiry-forms"],
  });

  // Mutations
  const deleteBlogMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/blogs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({ title: "Blog deleted successfully" });
    },
  });

  const deleteVideoMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/videos/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({ title: "Video deleted successfully" });
    },
  });

  const deleteEnquiryMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/enquiry-forms/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enquiry-forms"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({ title: "Enquiry form deleted successfully" });
    },
  });

  const handleExportContacts = async () => {
    try {
      const response = await fetch("/api/export/contacts");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({ title: "Contacts exported successfully" });
    } catch (error) {
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  const handleExportEnquiries = async () => {
    try {
      const response = await fetch("/api/export/enquiries");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'enquiry-forms.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast({ title: "Enquiry forms exported successfully" });
    } catch (error) {
      toast({ title: "Export failed", variant: "destructive" });
    }
  };

  const stats = [
    { label: "Total Blogs", value: blogs.length, icon: "📝" },
    { label: "Total Videos", value: videos.length, icon: "🎥" },
    { label: "Contact Messages", value: contacts.length, icon: "📧" },
    { label: "Enquiry Forms", value: enquiryForms.length, icon: "📋" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 pt-1">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-blue-100 via-purple-100 to-indigo-100 border-r border-indigo-200 min-h-screen shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold text-indigo-800">Admin Panel</h2>
          </div>
          <nav className="mt-6">
            <button
          onClick={() => setActiveSection("overview")}
          className={`w-full flex items-center px-6 py-3 text-left rounded-md transition-all duration-300 ${
            activeSection === "overview"
              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
              : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          }`}
          data-testid="nav-overview"
        >
          <span className="mr-3">📊</span>
          <span>Dashboard Overview</span>
        </button>
            <button
          onClick={() => setActiveSection("content")}
          className={`w-full flex items-center px-6 py-3 text-left rounded-md transition-all duration-300 ${
            activeSection === "content"
              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
              : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          }`}
          data-testid="nav-content"
        >
          <span className="mr-3">📝</span>
          <span>Content Management</span>
        </button>
            <button
          onClick={() => setActiveSection("inquiries")}
          className={`w-full flex items-center px-6 py-3 text-left rounded-md transition-all duration-300 ${
            activeSection === "inquiries"
              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
              : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          }`}
          data-testid="nav-inquiries"
        >
          <span className="mr-3">📧</span>
          <span>Inquiries</span>
        </button>
            <button
          onClick={() => setActiveSection("enquiry-forms")}
          className={`w-full flex items-center px-6 py-3 text-left rounded-md transition-all duration-300 ${
            activeSection === "enquiry-forms"
              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
              : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          }`}
          data-testid="nav-enquiry-forms"
        >
          <span className="mr-3">📤</span>
          <span>Enquiry Forms</span>
        </button>
<button
          onClick={() => setActiveSection("user-management")}
          className={`w-full flex items-center px-6 py-3 text-left rounded-md transition-all duration-300 ${
            activeSection === "user-management"
              ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-md"
              : "text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50"
          }`}
          data-testid="nav-user-management"
        >
          <span className="mr-3">👥</span>
          <span>User Management</span>
        </button>
          </nav>
        </div>

        {/* Main Content */}
          <div className="flex-1 p-8 bg-white/70 backdrop-blur-sm">
      {activeSection === "overview" && (
        <div className="fade-in">
          <h1 className="text-3xl font-bold text-indigo-800 mb-8" data-testid="text-dashboard-overview">
            Dashboard Overview
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 border border-indigo-100 bg-gradient-to-br from-white to-indigo-50"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-indigo-500 text-sm" data-testid={`stat-label-${index}`}>
                        {stat.label}
                      </p>
                      <p className="text-2xl font-bold text-indigo-800" data-testid={`stat-value-${index}`}>
                        {stat.value}
                      </p>
                    </div>
                    <div className="text-purple-600 text-2xl">{stat.icon}</div>
                  </div>
                </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
             {/* Recent Activity */}
<Card className="border border-indigo-200 bg-gradient-to-br from-white to-indigo-50 shadow-sm">
  <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-md">
    <CardTitle>Recent Activity</CardTitle>
  </CardHeader>
  <CardContent>
    {activitiesLoading ? (
      <p>Loading activities...</p>
    ) : activities.length === 0 ? (
      <p className="text-indigo-500">No recent activity</p>
    ) : (
      <div className="space-y-4">
        {activities.map((activity: Activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-4 p-3 hover:bg-indigo-50 rounded-md transition-colors border border-indigo-100"
            data-testid={`activity-${activity.id}`}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center shadow-inner">
              <span className="text-indigo-700">
                {activity.type === "blog" ? "📝" :
                 activity.type === "video" ? "🎥" :
                 activity.type === "contact" ? "📧" : "📋"}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-indigo-900 font-medium">{activity.title}</p>
              <p className="text-indigo-500 text-sm">
                {activity.createdAt ? new Date(activity.createdAt).toLocaleString() : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    )}
  </CardContent>
</Card>
            </div>
          )}

          {/* Content Management */}
          {activeSection === "content" && (
  <div className="fade-in">
    <h1 className="text-3xl font-bold text-indigo-800 mb-8" data-testid="text-content-management">
      Content Management
    </h1>

    <Tabs value={activeContentTab} onValueChange={setActiveContentTab}>
      <TabsList className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 p-2 rounded-lg">
        <TabsTrigger
          value="blogs"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md px-4 py-2 transition"
          data-testid="tab-blogs"
        >
          Blogs
        </TabsTrigger>
        <TabsTrigger
          value="videos"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-md px-4 py-2 transition"
          data-testid="tab-videos"
        >
          Videos
        </TabsTrigger>
      </TabsList>

                {/* Blogs Tab */}
      <TabsContent value="blogs">
        <Card className="border border-indigo-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-md">
            <CardTitle>Blog Posts</CardTitle>
            <Button
              onClick={() => setIsAddingBlog(true)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
              data-testid="button-add-blog"
            >
              Add New Blog
            </Button>
          </CardHeader>
          <CardContent>
            {blogsLoading ? (
              <p>Loading blogs...</p>
            ) : blogs.length === 0 ? (
              <p className="text-indigo-500">No blogs found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-indigo-200">
                    {blogs.map((blog: Blog) => (
                      <tr key={blog.id} data-testid={`blog-row-${blog.id}`} className="hover:bg-indigo-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-indigo-900 font-medium">{blog.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className="bg-purple-100 text-purple-700">{blog.category}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={blog.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}>
                            {blog.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                          {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingBlog(blog)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteBlogMutation.mutate(blog.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

                  {/* Videos Tab */}
      <TabsContent value="videos">
        <Card className="border border-indigo-200 bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-md">
            <CardTitle>Videos</CardTitle>
            <Button
              onClick={() => setIsAddingVideo(true)}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold shadow-md hover:scale-105 transition-transform"
              data-testid="button-add-video"
            >
              Add New Video
            </Button>
          </CardHeader>
          <CardContent>
            {videosLoading ? (
              <p>Loading videos...</p>
            ) : videos.length === 0 ? (
              <p className="text-indigo-500">No videos found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Views</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-indigo-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-indigo-200">
                    {videos.map((video: Video) => (
                      <tr key={video.id} data-testid={`video-row-${video.id}`} className="hover:bg-indigo-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap text-indigo-900 font-medium">{video.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{video.duration || "N/A"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">{video.views || "0"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-500">
                          {video.createdAt ? new Date(video.createdAt).toLocaleDateString() : ""}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingVideo(video)}
                            className="text-indigo-600 hover:text-indigo-800"
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteVideoMutation.mutate(video.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Delete
                          </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {/* Inquiries */}
          {activeSection === "inquiries" && (
            <div className="fade-in">
              <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent" data-testid="text-inquiries-management">
                Inquiries Management
              </h1>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Contact Form Data */}
                <Card  className="hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-blue-600">Contact Form Submissions</CardTitle>
                    <Button 
                      onClick={handleExportContacts}
                      variant="outline"
                       className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition"
                       data-testid="button-export-contacts"
                    >
                      📊 Export Excel
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {contactsLoading ? (
                      <p>Loading contacts...</p>
                    ) : contacts.length === 0 ? (
                      <p className="text-muted-foreground">No contact submissions found</p>
                    ) : (
                      <div className="space-y-4">
                        {contacts.map((contact: Contact) => (
                          <div 
                            key={contact.id} 
                            className="p-4 border border-blue-200 rounded-md hover:bg-blue-50 transition-colors duration-300"
                            data-testid={`contact-${contact.id}`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-foreground">
                                {contact.firstName} {contact.lastName}
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : ""}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{contact.email}</p>
                            <p className="text-sm text-muted-foreground mb-2">Subject: {contact.subject}</p>
                            <p className="text-sm text-foreground">{contact.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Enquiry Form Data */}
                <Card  className="hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
                  <CardHeader  className="flex flex-row items-center justify-between">
                    <CardTitle className="text-purple-600">Enquiry Form Management</CardTitle>
                    <Button 
                      onClick={handleExportEnquiries}
                      variant="outline"
                       className="bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90 transition"
                      data-testid="button-export-enquiries"
                    >
                      📊 Export Excel
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {enquiryFormsLoading ? (
                      <p>Loading enquiry forms...</p>
                    ) : enquiryForms.length === 0 ? (
                      <p className="text-muted-foreground">No enquiry forms found</p>
                    ) : (
                      <div className="space-y-4">
                        {enquiryForms.map((form: EnquiryFormType) => (
                          <div 
                            key={form.id} 
                            className="p-4 border border-purple-200 rounded-md hover:bg-purple-50 transition-colors duration-300"
                            data-testid={`enquiry-form-${form.id}`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium text-pink-700">{form.title}</h4>
                              <span className="text-xs text-muted-foreground">
                                {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : ""}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{form.description}</p>
                            <p className="text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                              <a href={form.googleFormUrl} target="_blank" rel="noopener noreferrer">
                                View Google Form →
                              </a>
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Enquiry Forms Management */}
          {activeSection === "enquiry-forms" && (
            <div className="fade-in">
              <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent" data-testid="text-enquiry-forms">
                Enquiry Forms Management
              </h1>
              
              <Card className="hover:shadow-xl transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-blue-600">Enquiry Forms</CardTitle>
                  <Button 
                    onClick={() => etIsAddingEnquiry(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition"
                    data-testid="button-add-enquiry-form"
                  >
                    Add New Form
                  </Button>
                </CardHeader>
                <CardContent>
                  {enquiryFormsLoading ? (
                    <p>Loading enquiry forms...</p>
                  ) : enquiryForms.length === 0 ? (
                    <p className="text-muted-foreground">No enquiry forms found</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {enquiryForms.map((form: EnquiryFormType) => (
                        <Card key={form.id} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="text-center mb-4">
                              <div className="text-4xl mb-2">{form.icon}</div>
                              <h3 className="text-lg font-semibold text-purple-700 mb-2">{form.title}</h3>
                              <p className="text-sm text-muted-foreground">{form.description}</p>
                            </div>
                            
                            <div className="space-y-2 mb-4">
                              {form.features?.map((feature, index) => (
                                <div key={index} className="flex items-center text-sm text-muted-foreground">
                                  <span className="text-green-600 mr-2">✓</span>
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingEnquiry(form)}
                                className="flex-1 border-blue-400 text-blue-600 hover:bg-blue-50"
                                data-testid={`button-edit-enquiry-${form.id}`}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteEnquiryMutation.mutate(form.id)}
                                className="flex-1 border-red-400 text-red-600 hover:bg-red-50"
                                data-testid={`button-delete-enquiry-${form.id}`}
                              >
                                Delete
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* User Management Section */}
          {activeSection === "user-management" && (
            <div className="fade-in">
              <UserManagement />
            </div>
          )}
        </div>
      </div>

      {/* Forms */}
      {isAddingBlog && (
        <BlogForm onClose={() => setIsAddingBlog(false)} />
      )}
      
      {editingBlog && (
        <BlogForm blog={editingBlog} onClose={() => setEditingBlog(null)} />
      )}
      
      {isAddingVideo && (
        <VideoForm onClose={() => setIsAddingVideo(false)} />
      )}
      
      {editingVideo && (
        <VideoForm video={editingVideo} onClose={() => setEditingVideo(null)} />
      )}
      
      {isAddingEnquiry && (
        <EnquiryForm onClose={() => setIsAddingEnquiry(false)} />
      )}
      
      {editingEnquiry && (
        <EnquiryForm enquiryForm={editingEnquiry} onClose={() => setEditingEnquiry(null)} />
      )}
    </div>
  );
}
