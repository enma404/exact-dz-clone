import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Level {
  id: string;
  name: string;
  name_ar: string;
  level_type: string;
  year_number: number;
  description: string | null;
  display_order: number;
  subjects_count?: number;
  documents_count?: number;
}

export const useLevels = () => {
  return useQuery({
    queryKey: ["levels"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("levels")
        .select(`
          *,
          subjects:subjects(count),
          documents:documents(count)
        `)
        .order("display_order", { ascending: true });

      if (error) throw error;

      return data.map((level) => ({
        ...level,
        subjects_count: level.subjects?.[0]?.count || 0,
        documents_count: level.documents?.[0]?.count || 0,
      })) as Level[];
    },
  });
};
