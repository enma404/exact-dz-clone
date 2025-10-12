-- Create enum for educational levels
CREATE TYPE education_level AS ENUM ('primary', 'middle', 'secondary');

-- Create enum for file types
CREATE TYPE file_type AS ENUM ('exam', 'homework', 'summary', 'exercise');

-- Create levels table
CREATE TABLE public.levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  level_type education_level NOT NULL,
  year_number INTEGER NOT NULL,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create subjects table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  level_id UUID REFERENCES public.levels(id) ON DELETE CASCADE,
  description TEXT,
  icon_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create exams/documents table
CREATE TABLE public.documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  title_ar TEXT NOT NULL,
  subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
  level_id UUID REFERENCES public.levels(id) ON DELETE CASCADE,
  file_type file_type NOT NULL DEFAULT 'exam',
  file_url TEXT,
  file_size INTEGER,
  year INTEGER,
  term INTEGER,
  downloads_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- RLS Policies (public read access)
CREATE POLICY "Allow public read access to levels"
  ON public.levels FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to subjects"
  ON public.subjects FOR SELECT
  USING (true);

CREATE POLICY "Allow public read access to documents"
  ON public.documents FOR SELECT
  USING (true);

-- Insert sample data for secondary education
INSERT INTO public.levels (name, name_ar, level_type, year_number, display_order) VALUES
  ('First Year Secondary', 'السنة الأولى ثانوي', 'secondary', 1, 1),
  ('Second Year Secondary', 'السنة الثانية ثانوي', 'secondary', 2, 2),
  ('Third Year Secondary', 'السنة الثالثة ثانوي', 'secondary', 3, 3);

-- Insert sample subjects for each level
WITH level_ids AS (
  SELECT id, year_number FROM public.levels WHERE level_type = 'secondary'
)
INSERT INTO public.subjects (name, name_ar, level_id, icon_name)
SELECT 
  name,
  name_ar,
  l.id,
  icon_name
FROM level_ids l
CROSS JOIN (
  VALUES 
    ('Mathematics', 'الرياضيات', 'calculator'),
    ('Physics', 'الفيزياء', 'atom'),
    ('Chemistry', 'الكيمياء', 'flask-conical'),
    ('Arabic', 'اللغة العربية', 'book-text'),
    ('French', 'اللغة الفرنسية', 'book-open'),
    ('English', 'اللغة الإنجليزية', 'languages'),
    ('Islamic Studies', 'العلوم الإسلامية', 'book-marked'),
    ('History', 'التاريخ', 'scroll-text'),
    ('Geography', 'الجغرافيا', 'globe'),
    ('Philosophy', 'الفلسفة', 'brain')
) AS subjects(name, name_ar, icon_name);

-- Insert sample documents
WITH subject_data AS (
  SELECT s.id as subject_id, s.name_ar, l.id as level_id, l.year_number
  FROM public.subjects s
  JOIN public.levels l ON s.level_id = l.id
  WHERE l.level_type = 'secondary'
  LIMIT 5
)
INSERT INTO public.documents (title, title_ar, subject_id, level_id, file_type, year, term, downloads_count, views_count)
SELECT 
  'Exam ' || doc_num || ' - ' || name_ar,
  'امتحان ' || doc_num || ' - ' || name_ar,
  subject_id,
  level_id,
  CASE WHEN doc_num % 3 = 0 THEN 'homework'::file_type
       WHEN doc_num % 3 = 1 THEN 'exam'::file_type
       ELSE 'summary'::file_type
  END,
  2024,
  CASE WHEN doc_num % 2 = 0 THEN 1 ELSE 2 END,
  (random() * 1000)::INTEGER,
  (random() * 2000)::INTEGER
FROM subject_data
CROSS JOIN generate_series(1, 10) AS doc_num;

-- Create function to increment download count
CREATE OR REPLACE FUNCTION public.increment_downloads(document_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.documents
  SET downloads_count = downloads_count + 1
  WHERE id = document_id;
END;
$$;

-- Create function to increment views count
CREATE OR REPLACE FUNCTION public.increment_views(document_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.documents
  SET views_count = views_count + 1
  WHERE id = document_id;
END;
$$;