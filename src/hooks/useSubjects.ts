import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Subject {
  id: string;
  name: string;
  name_ar: string;
  level_id: string;
  description: string | null;
  icon_name: string | null;
  documents_count?: number;
}

export const useSubjects = (levelId?: string) => {
  return useQuery({
    queryKey: ["subjects", levelId],
    queryFn: async () => {
      let query = supabase
        .from("subjects")
        .select(`
          *,
          documents:documents(count)
        `);

      if (levelId) {
        query = query.eq("level_id", levelId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data.map((subject) => ({
        ...subject,
        documents_count: subject.documents?.[0]?.count || 0,
      })) as Subject[];
    },
    enabled: !!levelId || levelId === undefined,
  });
};
