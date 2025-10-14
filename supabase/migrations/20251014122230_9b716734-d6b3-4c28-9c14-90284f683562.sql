-- إنشاء جدول الشعب للتعليم الثانوي
CREATE TABLE IF NOT EXISTS public.branches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  name_ar TEXT NOT NULL,
  level_id UUID REFERENCES public.levels(id) ON DELETE CASCADE,
  description TEXT,
  icon_name TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_branch_per_level UNIQUE (name_ar, level_id)
);

-- تفعيل RLS على جدول الشعب
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;

-- سياسة القراءة العامة للشعب
CREATE POLICY "Allow public read access to branches"
ON public.branches
FOR SELECT
USING (true);

-- إضافة عمود branch_id لجدول المواد
ALTER TABLE public.subjects 
ADD COLUMN IF NOT EXISTS branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL;

-- إدراج الشعب للسنة الأولى ثانوي (جذع مشترك علوم وتكنولوجيا + جذع مشترك آداب)
INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Common Core Science & Technology',
  'جذع مشترك علوم وتكنولوجيا',
  id,
  'الجذع المشترك علوم وتكنولوجيا',
  'atom',
  1
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 1;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Common Core Literature',
  'جذع مشترك آداب',
  id,
  'الجذع المشترك آداب',
  'book-text',
  2
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 1;

-- إدراج الشعب للسنة الثانية ثانوي
INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Sciences',
  'علوم تجريبية',
  id,
  'شعبة العلوم التجريبية',
  'flask-conical',
  1
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 2;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Mathematics',
  'رياضيات',
  id,
  'شعبة الرياضيات',
  'calculator',
  2
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 2;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Math & Technology',
  'تقني رياضي',
  id,
  'شعبة التقني رياضي',
  'settings',
  3
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 2;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Economics & Management',
  'تسيير واقتصاد',
  id,
  'شعبة التسيير والاقتصاد',
  'trending-up',
  4
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 2;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Literature & Philosophy',
  'آداب وفلسفة',
  id,
  'شعبة الآداب والفلسفة',
  'brain',
  5
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 2;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Foreign Languages',
  'لغات أجنبية',
  id,
  'شعبة اللغات الأجنبية',
  'languages',
  6
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 2;

-- نفس الشعب للسنة الثالثة ثانوي
INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Sciences',
  'علوم تجريبية',
  id,
  'شعبة العلوم التجريبية - البكالوريا',
  'flask-conical',
  1
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 3;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Mathematics',
  'رياضيات',
  id,
  'شعبة الرياضيات - البكالوريا',
  'calculator',
  2
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 3;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Math & Technology',
  'تقني رياضي',
  id,
  'شعبة التقني رياضي - البكالوريا',
  'settings',
  3
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 3;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Economics & Management',
  'تسيير واقتصاد',
  id,
  'شعبة التسيير والاقتصاد - البكالوريا',
  'trending-up',
  4
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 3;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Literature & Philosophy',
  'آداب وفلسفة',
  id,
  'شعبة الآداب والفلسفة - البكالوريا',
  'brain',
  5
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 3;

INSERT INTO public.branches (name, name_ar, level_id, description, icon_name, display_order)
SELECT 
  'Foreign Languages',
  'لغات أجنبية',
  id,
  'شعبة اللغات الأجنبية - البكالوريا',
  'languages',
  6
FROM public.levels 
WHERE level_type = 'secondary' AND year_number = 3;

-- ربط المواد الحالية بالشعب المناسبة
-- للسنة الثالثة ثانوي - شعبة علوم تجريبية
UPDATE public.subjects s
SET branch_id = b.id
FROM public.branches b
WHERE s.level_id = b.level_id
AND b.name_ar = 'علوم تجريبية'
AND b.level_id IN (SELECT id FROM public.levels WHERE level_type = 'secondary' AND year_number = 3)
AND s.name_ar IN ('الرياضيات', 'الفيزياء', 'الكيمياء', 'العلوم الإسلامية');