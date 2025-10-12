import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Download, Eye, FileText, Search } from "lucide-react";
import { useDocuments } from "@/hooks/useDocuments";
import { useLevels } from "@/hooks/useLevels";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedLevel, setSelectedLevel] = useState(searchParams.get("level") || "");
  const [selectedFileType, setSelectedFileType] = useState(searchParams.get("type") || "");

  const { data: levels } = useLevels();
  const { data: documents, isLoading } = useDocuments({
    searchQuery: searchParams.get("q") || undefined,
    levelId: searchParams.get("level") || undefined,
    fileType: searchParams.get("type") || undefined,
  });

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedLevel) params.set("level", selectedLevel);
    if (selectedFileType) params.set("type", selectedFileType);
    setSearchParams(params);
  };

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Search Section */}
        <section className="bg-[hsl(var(--darker-bg))] py-12 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-6">
              <h1 className="text-4xl font-bold text-white text-center mb-8">البحث في الوثائق</h1>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="ابحث عن امتحانات، فروض، ملخصات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pr-10 bg-background border-border"
                  />
                </div>
                <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
                  بحث
                </Button>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="اختر المستوى" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع المستويات</SelectItem>
                    {levels?.map((level) => (
                      <SelectItem key={level.id} value={level.id}>
                        {level.name_ar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedFileType} onValueChange={setSelectedFileType}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="نوع الملف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="exam">امتحان</SelectItem>
                    <SelectItem value="homework">فرض</SelectItem>
                    <SelectItem value="summary">ملخص</SelectItem>
                    <SelectItem value="exercise">تمرين</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <p className="text-muted-foreground">
                      تم العثور على <span className="text-primary font-bold">{documents?.length || 0}</span> نتيجة
                    </p>
                  </div>

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
                              <div className="flex flex-wrap gap-2 mb-2">
                                <Badge variant={getFileTypeBadge(doc.file_type)}>
                                  {getFileTypeLabel(doc.file_type)}
                                </Badge>
                                {doc.level && (
                                  <Badge variant="outline">{doc.level.name_ar}</Badge>
                                )}
                                {doc.subject && (
                                  <Badge variant="outline">{doc.subject.name_ar}</Badge>
                                )}
                                {doc.year && (
                                  <Badge variant="outline">السنة: {doc.year}</Badge>
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
                        <p className="text-xl text-muted-foreground">لم يتم العثور على نتائج</p>
                        <p className="text-muted-foreground mt-2">جرب استخدام كلمات مفتاحية أخرى</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
