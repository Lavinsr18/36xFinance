import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertVideoSchema, type Video } from "@shared/schema";
import { X } from "lucide-react";

const videoFormSchema = insertVideoSchema.extend({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  description: z.string().min(1, "Description is required").min(20, "Description must be at least 20 characters"),
  youtubeUrl: z
    .string()
    .min(1, "YouTube URL is required")
    .regex(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/, "Please enter a valid YouTube URL"),
  duration: z.string().optional(),
  views: z.string().optional(),
});

type VideoFormData = z.infer<typeof videoFormSchema>;

interface VideoFormProps {
  video?: Video;
  onClose: () => void;
}

export default function VideoForm({ video, onClose }: VideoFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!video;
  const [previewUrl, setPreviewUrl] = useState("");

  const form = useForm<VideoFormData>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: video?.title || "",
      description: video?.description || "",
      youtubeUrl: video?.youtubeUrl || "",
      duration: video?.duration || "",
      views: video?.views || "0",
    },
  });

  const extractVideoId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getYoutubeThumbnail = (url: string) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
  };

  const getEmbedUrl = (url: string) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
  };

  const createVideoMutation = useMutation({
    mutationFn: (data: VideoFormData) => {
      const thumbnail = getYoutubeThumbnail(data.youtubeUrl);
      return apiRequest("POST", "/api/videos", { ...data, thumbnail });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Video Added",
        description: "Your video has been added successfully.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error adding the video.",
        variant: "destructive",
      });
    },
  });

  const updateVideoMutation = useMutation({
    mutationFn: (data: VideoFormData) => {
      const thumbnail = getYoutubeThumbnail(data.youtubeUrl);
      return apiRequest("PUT", `/api/videos/${video!.id}`, { ...data, thumbnail });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/videos"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Video Updated",
        description: "Your video has been updated successfully.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error updating the video.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: VideoFormData) => {
    if (isEditing) {
      updateVideoMutation.mutate(data);
    } else {
      createVideoMutation.mutate(data);
    }
  };

  const isPending = createVideoMutation.isPending || updateVideoMutation.isPending;

  const handleUrlChange = (url: string) => {
    form.setValue("youtubeUrl", url);
    if (url && extractVideoId(url)) {
      setPreviewUrl(getEmbedUrl(url));
    } else {
      setPreviewUrl("");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white text-gray-800 shadow-xl rounded-xl transition-all">
  <DialogHeader>
    <div className="flex items-center justify-between">
      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
        {isEditing ? "Edit Video" : "Add New Video"}
      </DialogTitle>
      <Button
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="text-gray-500 hover:text-pink-600 transition-colors"
        data-testid="button-close"
      >
        <X className="h-5 w-5" />
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
          className="mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
          placeholder="Enter video title..."
          data-testid="input-title"
        />
        {form.formState.errors.title && (
          <p className="text-pink-600 text-sm mt-1">{form.formState.errors.title.message}</p>
        )}
      </div>

      {/* YouTube URL */}
      <div className="md:col-span-2">
        <Label htmlFor="youtubeUrl" className="text-gray-700">YouTube URL *</Label>
        <Input
          id="youtubeUrl"
          {...form.register("youtubeUrl")}
          onChange={(e) => handleUrlChange(e.target.value)}
          className="mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
          placeholder="https://www.youtube.com/watch?v=..."
          data-testid="input-youtube-url"
        />
        {form.formState.errors.youtubeUrl && (
          <p className="text-pink-600 text-sm mt-1">{form.formState.errors.youtubeUrl.message}</p>
        )}
      </div>

      {/* Video Preview */}
      {previewUrl && (
        <div className="md:col-span-2">
          <Label className="text-gray-700">Video Preview</Label>
          <div className="mt-2 aspect-video bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <iframe
              src={previewUrl}
              title="Video Preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </div>
      )}

      {/* Duration */}
      <div>
        <Label htmlFor="duration" className="text-gray-700">Duration (e.g., 12:34)</Label>
        <Input
          id="duration"
          {...form.register("duration")}
          className="mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:border-pink-400 focus:ring-2 focus:ring-pink-200"
          placeholder="12:34"
          data-testid="input-duration"
        />
      </div>

      {/* Views */}
      <div>
        <Label htmlFor="views" className="text-gray-700">View Count</Label>
        <Input
          id="views"
          {...form.register("views")}
          className="mt-2 border border-gray-300 rounded-lg px-3 py-2 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200"
          placeholder="1000"
          data-testid="input-views"
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <Label htmlFor="description" className="text-gray-700">Description *</Label>
        <Textarea
          id="description"
          {...form.register("description")}
          className="mt-2 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-200"
          rows={6}
          placeholder="Describe what this video covers..."
          data-testid="textarea-description"
        />
      </div>
    </div>

    {/* Tips Section */}
    <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
      <h4 className="font-semibold text-pink-600 mb-2">Tips for Adding Videos:</h4>
      <ul className="text-sm text-gray-600 space-y-1">
        <li>• Use clear, descriptive titles that explain the video content</li>
        <li>• Ensure the YouTube URL is public and accessible</li>
        <li>• Write detailed descriptions to help users understand the value</li>
        <li>• Include duration for better user experience</li>
      </ul>
    </div>

    {/* Footer Buttons */}
    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
      <Button
        type="button"
        variant="outline"
        onClick={onClose}
        disabled={isPending}
        className="border border-gray-300 text-gray-600 hover:bg-gray-100"
        data-testid="button-cancel"
      >
        Cancel
      </Button>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-gradient-to-r from-pink-500 via-pink-400 to-yellow-400 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 transition-transform"
        data-testid="button-save"
      >
        {isPending ? (isEditing ? "Updating..." : "Adding...") : isEditing ? "Update Video" : "Add Video"}
      </Button>
    </div>
  </form>
</DialogContent>
    </Dialog>
  );
}
