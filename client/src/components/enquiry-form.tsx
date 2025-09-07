import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertEnquiryFormSchema, type EnquiryForm } from "@shared/schema";
import { X, Plus, Trash2 } from "lucide-react";

const enquiryFormSchema = insertEnquiryFormSchema.extend({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(1, "Description is required").max(500, "Description is too long"),
  icon: z.string().min(1, "Icon is required"),
  image: z.string().url("Please enter a valid image URL").optional().or(z.literal("")),
  googleFormUrl: z.string().min(1, "Google Form URL is required").url("Please enter a valid URL"),
  features: z.array(z.string()).optional(),
  isActive: z.boolean(),
});

type EnquiryFormData = z.infer<typeof enquiryFormSchema>;

interface EnquiryFormProps {
  enquiryForm?: EnquiryForm;
  onClose: () => void;
}

export default function EnquiryFormComponent({ enquiryForm, onClose }: EnquiryFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const isEditing = !!enquiryForm;
  const [features, setFeatures] = useState<string[]>(enquiryForm?.features || []);
  const [newFeature, setNewFeature] = useState("");

  const form = useForm<EnquiryFormData>({
    resolver: zodResolver(enquiryFormSchema),
    defaultValues: {
      title: enquiryForm?.title || "",
      description: enquiryForm?.description || "",
      icon: enquiryForm?.icon || "📋",
      image: enquiryForm?.image || "",
      googleFormUrl: enquiryForm?.googleFormUrl || "",
      features: enquiryForm?.features || [],
      isActive: enquiryForm?.isActive ?? true,
    },
  });

  const createEnquiryMutation = useMutation({
    mutationFn: (data: EnquiryFormData) => apiRequest("POST", "/api/enquiry-forms", { ...data, features }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enquiry-forms"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Enquiry Form Created",
        description: "Your enquiry form has been created successfully.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error creating the enquiry form.",
        variant: "destructive",
      });
    },
  });

  const updateEnquiryMutation = useMutation({
    mutationFn: (data: EnquiryFormData) => 
      apiRequest("PUT", `/api/enquiry-forms/${enquiryForm!.id}`, { ...data, features }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/enquiry-forms"] });
      queryClient.invalidateQueries({ queryKey: ["/api/activities"] });
      toast({
        title: "Enquiry Form Updated",
        description: "Your enquiry form has been updated successfully.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "There was an error updating the enquiry form.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: EnquiryFormData) => {
    if (isEditing) {
      updateEnquiryMutation.mutate(data);
    } else {
      createEnquiryMutation.mutate(data);
    }
  };

  const isPending = createEnquiryMutation.isPending || updateEnquiryMutation.isPending;

  const addFeature = () => {
    if (newFeature.trim() && !features.includes(newFeature.trim())) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const commonIcons = ["📋", "💼", "📊", "💰", "🏢", "📈", "⚖️", "🔍", "📝", "🎯"];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-fadeIn bg-gradient-to-br from-white via-indigo-50 to-yellow-50">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-indigo-700">
              {isEditing ? "Edit Enquiry Form" : "Create New Enquiry Form"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-red-100 transition-all duration-300"
              data-testid="button-close"
            >
              <X className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <Label htmlFor="title" className="text-indigo-700">Form Title *</Label>
              <Input
                id="title"
                {...form.register("title")}
                className="mt-2 border-indigo-300 focus:border-yellow-400 focus:ring focus:ring-yellow-200 transition-all"
                placeholder="Enter form title..."
              />
              {form.formState.errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            {/* Icon Picker */}
            <div>
              <Label htmlFor="icon" className="text-indigo-700">Icon *</Label>
              <div className="mt-2 space-y-2">
                <Input
                  id="icon"
                  {...form.register("icon")}
                  placeholder="📋"
                  className="text-2xl text-center border-purple-300 focus:border-yellow-400"
                />
                <div className="flex flex-wrap gap-2">
                  {commonIcons.map((icon) => (
                    <Button
                      key={icon}
                      type="button"
                      variant="outline"
                      size="sm"
                      className="text-lg p-2 hover:bg-indigo-100 transition-all"
                      onClick={() => form.setValue("icon", icon)}
                    >
                      {icon}
                    </Button>
                  ))}
                </div>
              </div>
              {form.formState.errors.icon && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.icon.message}
                </p>
              )}
            </div>

            {/* Status */}
            <div className="flex items-end">
              <div className="flex-1">
                <Label htmlFor="isActive" className="text-indigo-700">Status</Label>
                <div className="flex items-center space-x-2 mt-2">
                  <Switch
                    id="isActive"
                    checked={form.watch("isActive")}
                    onCheckedChange={(checked) => form.setValue("isActive", checked)}
                  />
                  <Label htmlFor="isActive" className="text-sm text-purple-700">
                    {form.watch("isActive") ? "Active" : "Inactive"}
                  </Label>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="md:col-span-2">
              <Label htmlFor="image" className="text-indigo-700">Image URL</Label>
              <Input
                id="image"
                {...form.register("image")}
                className="mt-2 border-purple-300 focus:border-yellow-400"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <Label htmlFor="description" className="text-indigo-700">Description *</Label>
              <Textarea
                id="description"
                {...form.register("description")}
                className="mt-2 resize-none border-indigo-300 focus:border-yellow-400"
                rows={4}
              />
            </div>

            {/* Google Form */}
            <div className="md:col-span-2">
              <Label htmlFor="googleFormUrl" className="text-indigo-700">Google Form URL *</Label>
              <Input
                id="googleFormUrl"
                {...form.register("googleFormUrl")}
                className="mt-2 border-purple-300 focus:border-yellow-400"
                placeholder="https://forms.gle/..."
              />
            </div>

            {/* Features */}
            <div className="md:col-span-2">
              <Label className="text-indigo-700">Features</Label>
              <div className="mt-2 space-y-3">
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature..."
                    className="border-purple-300 focus:border-yellow-400"
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-500 text-white hover:opacity-90 transition-all"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {features.length > 0 && (
                  <div className="space-y-2">
                    {features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between bg-gradient-to-r from-indigo-50 via-yellow-50 to-purple-50 p-3 rounded shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="flex items-center text-sm">
                          <span className="text-green-600 mr-2">✓</span>
                          <span>{feature}</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-yellow-50 via-indigo-50 to-purple-50 p-4 rounded-lg shadow-sm">
            <h4 className="font-semibold text-indigo-700 mb-2">Google Forms Integration:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Create your Google Form and make it public</li>
              <li>• Copy the shareable link (forms.gle/...)</li>
              <li>• Users will be redirected to your Google Form when they click the enquiry button</li>
              <li>• You can view submissions directly in your Google Forms dashboard</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isPending}
              className="hover:bg-gray-100 transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-500 text-white hover:opacity-90 transition-all shadow-md"
            >
              {isPending
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update Form"
                : "Create Form"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
