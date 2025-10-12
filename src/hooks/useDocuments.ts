import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Document {
  id: string;
  title: string;
  title_ar: string;
  subject_id: string;
  level_id: string;
  file_type: string;
  file_url: string | null;
  file_size: number | null;
  year: number | null;
  term: number | null;
  downloads_count: number;
  views_count: number;
  created_at: string;
  subject?: {
    name_ar: string;
    icon_name: string | null;
  };
  level?: {
    name_ar: string;
  };
}

export const useDocuments = (filters?: {
  levelId?: string;
  subjectId?: string;
  searchQuery?: string;
  fileType?: string;
}) => {
  return useQuery({
    queryKey: ["documents", filters],
    queryFn: async () => {
      let query = supabase
        .from("documents")
        .select(`
          *,
          subject:subjects(name_ar, icon_name),
          level:levels(name_ar)
        `)
        .order("created_at", { ascending: false });

      if (filters?.levelId) {
        query = query.eq("level_id", filters.levelId);
      }

      if (filters?.subjectId) {
        query = query.eq("subject_id", filters.subjectId);
      }

      if (filters?.searchQuery) {
        query = query.ilike("title_ar", `%${filters.searchQuery}%`);
      }

      if (filters?.fileType) {
        query = query.eq("file_type", filters.fileType as any);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data as Document[];
    },
  });
};
