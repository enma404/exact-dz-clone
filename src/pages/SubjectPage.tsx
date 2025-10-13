import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Eye, FileText } from "lucide-react";
import { toast } from "sonner";

const SubjectPage = () => {
  const { subjectId } = useParams();

  const { data: subject, isLoading: subjectLoading } = useQuery({
    queryKey: ["subject", subjectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("subjects")
        .select(`
          *,
          level:levels(name_ar)
        `)
        .eq("id", subjectId)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const { data: documents, isLoading: documentsLoading } = useQuery({
    queryKey: ["documents", subjectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("subject_id", subjectId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleDownload = async (documentId: string) => {
    try {
      await supabase.rpc("increment_downloads", { document_id: documentId });
      toast.success("تم بدء التحميل");
    } catch (error) {
      toast.error("حدث خطأ أثناء التحميل");
    }
  };

  const getFileTypeLabel = (fileType: string) => {
    const types: { [key: string]: string } = {
      exam: "امتحان",
      homework: "فرض",
      summary: "ملخص",
      exercise: "تمرين",
    };
    return types[fileType] || fileType;
  };

  const getFileTypeBadge = (fileType: string) => {
    const variants: { [key: string]: any } = {
      exam: "default",
      homework: "secondary",
      summary: "outline",
      exercise: "destructive",
    };
    return variants[fileType] || "default";
  };

  if (subjectLoading || documentsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-[hsl(var(--darker-bg))] py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <BackButton />
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <span>{subject?.level?.name_ar}</span>
                  <span>•</span>
                  <span>{documents?.length || 0} وثيقة</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  {subject?.name_ar}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Documents List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto space-y-4">
              {documents?.map((doc) => (
                <Card
                  key={doc.id}
                  className="relative overflow-hidden bg-[hsl(var(--card-bg))]/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-bold text-white">{doc.title_ar}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={getFileTypeBadge(doc.file_type)}>
                            {getFileTypeLabel(doc.file_type)}
                          </Badge>
                          {doc.year && (
                            <Badge variant="outline">السنة: {doc.year}</Badge>
                          )}
                          {doc.term && (
                            <Badge variant="outline">الفصل {doc.term}</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Download className="h-4 w-4" />
                            <span>{doc.downloads_count}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{doc.views_count}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => handleDownload(doc.id)}
                          className="bg-primary hover:bg-primary/90"
                        >
                          <Download className="h-4 w-4 ml-2" />
                          تحميل
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {documents?.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-xl text-muted-foreground">لا توجد وثائق متاحة حاليًا</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SubjectPage;
