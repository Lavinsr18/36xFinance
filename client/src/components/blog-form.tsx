import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertBlogSchema, type Blog } from "@shared/schema";
import { X, Upload, Image as ImageIcon } from "lucide-react";

const blogFormSchema = insertBlogSchema.extend({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  content: z.string().min(1, "Content is required").min(50, "Content must be at least 50 characters"),
  excerpt: z.string().min(1, "Excerpt is required").max(300, "Excerpt is too long"),
  category: z.string().min(1, "Category is required"),
  image: z.string().optional().or(z.literal("")).refine(
    (value) => {
      if (!value) return true; // Empty is okay
      // Check if it's a valid URL or base64 data URL
      try {
        new URL(value);
        return true;
      } catch {
        return value.startsWith('data:image/');
      }
    },
    {
      message: "Please enter a valid image URL or upload an image file",
    }
  ),
  status: z.enum(["published", "draft"]),
});

type BlogFormData = z.infer<typeof blogFormSchema>;

interface BlogFormProps {
  blog?: Blog;
  onClose: () => void;
}

export default function BlogForm({ blog, onClose }: BlogFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!blog;
  const [imagePreview, setImagePreview] = useState<string>(blog?.image || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<BlogFormData>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: blog?.title || "",
      content: blog?.content || "",
      excerpt: blog?.excerpt || "",
      category: blog?.category || "",
      image: blog?.image || "",
      status: blog?.status || "published",
    },
  });

  const createBlogMutation = useMutation({
    mutationFn: (data: BlogFormData) => apiRequest("POST", "/api/blogs", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Blog Created",
        description: "Your blog post has been created successfully.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error creating the blog post.",
        variant: "destructive",
      });
    },
  });

  const updateBlogMutation = useMutation({
    mutationFn: (data: BlogFormData) => apiRequest("PUT", `/api/blogs/${blog!.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blogs"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Blog Updated",
        description: "Your blog post has been updated successfully.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error updating the blog post.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: BlogFormData) => {
    if (isEditing) {
      updateBlogMutation.mutate(data);
    } else {
      createBlogMutation.mutate(data);
    }
  };

  const isPending = createBlogMutation.isPending || updateBlogMutation.isPending;

  // Handle image upload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid File Type",
        description: "Please select an image file (JPG, PNG, GIF, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    try {
      // Convert to base64 for preview and storage
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        form.setValue("image", result);
        toast({
          title: "Image Uploaded",
          description: "Image has been uploaded successfully",
        });
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast({
          title: "Upload Failed",
          description: "Failed to process the image",
          variant: "destructive",
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "An error occurred while uploading the image",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  // Handle URL input change
  const handleUrlChange = (url: string) => {
    form.setValue("image", url);
    setImagePreview(url);
  };

  // Clear image
  const clearImage = () => {
    setImagePreview("");
    form.setValue("image", "");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const categories = [
    "Tax Planning",
    "Business Strategy",
    "Investment Tips",
    "Financial Planning",
    "Compliance",
    "Entrepreneurship",
    "Retirement Planning",
    "Estate Planning",
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-gray-800 shadow-xl rounded-xl animate-[fadeInScale_0.3s_ease-out]">
  <DialogHeader>
    <div className="flex items-center justify-between">
      <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-pink-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
        {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
      </DialogTitle>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        data-testid="button-close"
        className="hover:bg-pink-50 hover:text-pink-600"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  </DialogHeader>

  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Title */}
      <div className="md:col-span-2">
        <Label htmlFor="title" className="text-gray-700">Title *</Label>
        <Input
          id="title"
          {...form.register("title")}
          placeholder="Enter blog title..."
          data-testid="input-title"
          className="mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:border-pink-400 focus:ring-2 focus:ring-pink-200 transition"
        />
        {form.formState.errors.title && (
          <p className="text-pink-600 text-sm mt-1">
            {form.formState.errors.title.message}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <Label htmlFor="category" className="text-gray-700">Category *</Label>
        <Select 
          onValueChange={(value) => form.setValue("category", value)}
          defaultValue={form.getValues("category")}
        >
          <SelectTrigger className="mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg">
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.category && (
          <p className="text-pink-600 text-sm mt-1">
            {form.formState.errors.category.message}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <Label htmlFor="status" className="text-gray-700">Status *</Label>
        <Select 
          onValueChange={(value) => form.setValue("status", value as "published" | "draft")}
          defaultValue={form.getValues("status")}
        >
          <SelectTrigger className="mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg">
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
        {form.formState.errors.status && (
          <p className="text-pink-600 text-sm mt-1">
            {form.formState.errors.status.message}
          </p>
        )}
      </div>

      {/* Featured Image */}
      <div className="md:col-span-2">
        <Label className="text-gray-700">Featured Image</Label>
        <div className="mt-2 space-y-4">
          {imagePreview && (
            <div className="relative border border-gray-300 rounded-lg overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
              />
              <Button
                type="button"
                size="sm"
                className="absolute top-2 right-2 bg-pink-500 hover:bg-pink-600 text-white"
                onClick={clearImage}
                data-testid="button-clear-image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Upload Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="image-url" className="text-sm font-medium text-gray-700">
                Image URL
              </Label>
              <Input
                id="image-url"
                value={form.watch("image") || ""}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200"
              />
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-700">
                Upload Image
              </Label>
              <div className="mt-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="w-full border border-pink-400 text-pink-600 hover:bg-pink-50"
                >
                  {isUploading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">⏳</span>
                      Uploading...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Upload className="h-4 w-4 mr-2 text-pink-500" />
                      Upload Image
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>• Upload an image file (JPG, PNG, GIF) up to 5MB</p>
            <p>• Or enter a direct URL to an image</p>
          </div>
        </div>
      </div>

      {/* Excerpt */}
      <div className="md:col-span-2">
        <Label htmlFor="excerpt" className="text-gray-700">Excerpt *</Label>
        <Textarea
          id="excerpt"
          {...form.register("excerpt")}
          className="mt-2 resize-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-200"
          rows={3}
          placeholder="Brief summary of the blog post..."
        />
        <div className="flex justify-between mt-1">
          {form.formState.errors.excerpt && (
            <p className="text-pink-600 text-sm">
              {form.formState.errors.excerpt.message}
            </p>
          )}
          <p className="text-gray-400 text-sm ml-auto">
            {form.watch("excerpt")?.length || 0}/300
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="md:col-span-2">
        <Label htmlFor="content" className="text-gray-700">Content *</Label>
        <Textarea
          id="content"
          {...form.register("content")}
          className="mt-2 resize-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-200"
          rows={12}
          placeholder="Write your blog content here..."
        />
        {form.formState.errors.content && (
          <p className="text-pink-600 text-sm mt-1">
            {form.formState.errors.content.message}
          </p>
        )}
      </div>
    </div>

    {/* Footer Buttons */}
    <div className="flex justify-end space-x-4 pt-6 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        disabled={isPending}
        className="border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-gradient-to-r from-pink-500 via-pink-400 to-yellow-400 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
      >
        {isPending
          ? isEditing
            ? "Updating..."
            : "Creating..."
          : isEditing
          ? "Update Blog"
          : "Create Blog"}
      </Button>
    </div>
  </form>
</DialogContent>

    </Dialog>
  );
}
