-- حذف التكرارات من المستويات والمواد والمستندات
-- الخطوة 1: إنشاء جدول مؤقت للمستويات الفريدة
CREATE TEMP TABLE unique_levels AS
SELECT DISTINCT ON (level_type, year_number)
  id, name, name_ar, level_type, year_number, description, display_order, created_at
FROM levels
ORDER BY level_type, year_number, created_at;

-- الخطوة 2: إنشاء جدول مؤقت للمواد الفريدة
CREATE TEMP TABLE unique_subjects AS
SELECT DISTINCT ON (name_ar, level_id)
  s.id, s.name, s.name_ar, s.description, s.icon_name, s.level_id, s.created_at
FROM subjects s
INNER JOIN unique_levels ul ON s.level_id = ul.id
ORDER BY name_ar, level_id, created_at;

-- الخطوة 3: تحديث المستندات لتشير إلى المستويات والمواد الفريدة
UPDATE documents d
SET 
  level_id = ul.id,
  subject_id = us.id
FROM unique_levels ul, unique_subjects us
WHERE 
  EXISTS (
    SELECT 1 FROM levels l 
    WHERE l.id = d.level_id 
    AND l.level_type = ul.level_type 
    AND l.year_number = ul.year_number
  )
  AND EXISTS (
    SELECT 1 FROM subjects s
    WHERE s.id = d.subject_id
    AND s.name_ar = us.name_ar
    AND s.level_id = ul.id
  );

-- الخطوة 4: حذف المواد المكررة
DELETE FROM subjects
WHERE id NOT IN (SELECT id FROM unique_subjects);

-- الخطوة 5: حذف المستويات المكررة
DELETE FROM levels
WHERE id NOT IN (SELECT id FROM unique_levels);

-- الخطوة 6: إضافة قيود فريدة لمنع التكرار في المستقبل
ALTER TABLE levels 
ADD CONSTRAINT unique_level_type_year UNIQUE (level_type, year_number);

ALTER TABLE subjects
ADD CONSTRAINT unique_subject_per_level UNIQUE (name_ar, level_id);