import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Download, Eye, FileText, BookOpen, FileCheck, ClipboardList, BookMarked } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [selectedFileType, setSelectedFileType] = useState<string | null>(null);

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
    queryKey: ["documents", subjectId, selectedFileType],
    queryFn: async () => {
      let query = supabase
        .from("documents")
        .select("*")
        .eq("subject_id", subjectId)
        .order("created_at", { ascending: false });

      if (selectedFileType) {
        query = query.eq("file_type", selectedFileType as any);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data;
    },
  });

  const fileTypes = [
    { id: "exercise", label: "تمارين", icon: BookOpen, count: 0 },
    { id: "homework", label: "فروض", icon: ClipboardList, count: 0 },
    { id: "exam", label: "اختبارات", icon: FileCheck, count: 0 },
    { id: "summary", label: "ملخصات", icon: BookMarked, count: 0 },
  ];

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

        {/* File Type Filter */}
        <section className="py-8 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                اختر نوع المحتوى
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {fileTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedFileType === type.id;
                  return (
                    <Card
                      key={type.id}
                      className={`relative overflow-hidden cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? "bg-primary/20 border-primary"
                          : "bg-[hsl(var(--card-bg))]/30 border-primary/20 hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedFileType(isSelected ? null : type.id)}
                    >
                      <div className="p-6">
                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className={`p-4 rounded-xl transition-all duration-300 ${
                            isSelected ? "bg-primary/30" : "bg-primary/20"
                          }`}>
                            <Icon className="h-8 w-8 text-primary" />
                          </div>
                          <h3 className={`text-lg font-bold transition-colors ${
                            isSelected ? "text-primary" : "text-foreground"
                          }`}>
                            {type.label}
                          </h3>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="absolute top-2 left-2">
                          <div className="bg-primary rounded-full p-1">
                            <FileCheck className="h-4 w-4 text-primary-foreground" />
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Documents List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {selectedFileType && (
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-foreground">
                    {fileTypes.find(t => t.id === selectedFileType)?.label}
                  </h3>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedFileType(null)}
                    className="text-sm"
                  >
                    عرض الكل
                  </Button>
                </div>
              )}
              
              <div className="space-y-4">
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
                    <p className="text-xl text-muted-foreground">
                      {selectedFileType 
                        ? "لا توجد وثائق من هذا النوع حاليًا"
                        : "لا توجد وثائق متاحة حاليًا"}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      سيتم إضافة المحتوى قريبًا
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SubjectPage;
