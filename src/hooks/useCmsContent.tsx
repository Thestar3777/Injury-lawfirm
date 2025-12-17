import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export interface CmsContent {
  id: string;
  section_key: string;
  content: Record<string, unknown>;
  updated_at: string;
  updated_by: string | null;
}

// Public hook - uses secure function that only returns safe columns (no metadata)
export const useCmsContent = (sectionKey?: string) => {
  return useQuery({
    queryKey: ["cms-content", sectionKey],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_public_cms_content', {
        p_section_key: sectionKey || null
      });

      if (error) throw error;
      
      // Type assertion since Supabase types may not be updated yet
      return (sectionKey ? data?.[0] : data) as CmsContent | CmsContent[] | null;
    }
  });
};

// Admin hook - uses direct table access (requires admin role)
export const useAdminCmsContent = (sectionKey?: string) => {
  return useQuery({
    queryKey: ["admin-cms-content", sectionKey],
    queryFn: async () => {
      let query = supabase.from("cms_content").select("*");
      
      if (sectionKey) {
        query = query.eq("section_key", sectionKey);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return (sectionKey ? data?.[0] : data) as CmsContent | CmsContent[] | null;
    }
  });
};

export const useUpdateCmsContent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ sectionKey, content }: { sectionKey: string; content: Record<string, unknown> }) => {
      const { data: userData } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from("cms_content")
        .update({ 
          content: content as Json, 
          updated_by: userData.user?.id 
        })
        .eq("section_key", sectionKey)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cms-content"] });
      toast.success("Content updated successfully");
    },
    onError: (error) => {
      console.error("Error updating content:", error);
      toast.error("Failed to update content");
    }
  });
};

export const useUploadCmsImage = () => {
  return useMutation({
    mutationFn: async ({ file, path }: { file: File; path: string }) => {
      const { data, error } = await supabase.storage
        .from("cms-images")
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("cms-images")
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    },
    onError: (error) => {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  });
};
