import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Branch {
  id: string;
  name: string;
  name_ar: string;
  level_id: string;
  description: string | null;
  icon_name: string | null;
  display_order: number;
  subjects_count?: number;
  documents_count?: number;
}

export const useBranches = (levelId?: string) => {
  return useQuery({
    queryKey: ["branches", levelId],
    queryFn: async () => {
      let query = supabase
        .from("branches")
        .select(`
          *,
          subjects:subjects(count),
          documents:documents(count)
        `)
        .order("display_order", { ascending: true });

      if (levelId) {
        query = query.eq("level_id", levelId);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((branch: any) => ({
        ...branch,
        subjects_count: branch.subjects?.[0]?.count || 0,
        documents_count: branch.documents?.[0]?.count || 0,
      })) as Branch[];
    },
    enabled: !!levelId,
  });
};
