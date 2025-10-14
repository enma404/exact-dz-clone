-- حذف جميع التكرارات في المستويات والمواد
-- الخطوة 1: حذف المستويات المكررة (الاحتفاظ بأقدم سجل)
WITH duplicate_levels AS (
  SELECT id, ROW_NUMBER() OVER (PARTITION BY level_type, year_number ORDER BY created_at) as rn
  FROM levels
),
old_to_new_level_mapping AS (
  SELECT 
    old_l.id as old_id,
    new_l.id as new_id
  FROM levels old_l
  CROSS JOIN LATERAL (
    SELECT id 
    FROM levels 
    WHERE level_type = old_l.level_type 
    AND year_number = old_l.year_number
    ORDER BY created_at
    LIMIT 1
  ) new_l
)
-- تحديث جميع المواد للإشارة إلى المستوى الصحيح
UPDATE subjects
SET level_id = mapping.new_id
FROM old_to_new_level_mapping mapping
WHERE subjects.level_id = mapping.old_id;

-- الخطوة 2: حذف المواد المكررة (الاحتفاظ بأقدم سجل)
WITH old_to_new_subject_mapping AS (
  SELECT 
    old_s.id as old_id,
    new_s.id as new_id
  FROM subjects old_s
  CROSS JOIN LATERAL (
    SELECT id 
    FROM subjects 
    WHERE name_ar = old_s.name_ar 
    AND level_id = old_s.level_id
    ORDER BY created_at
    LIMIT 1
  ) new_s
)
-- تحديث جميع المستندات للإشارة إلى المادة الصحيحة
UPDATE documents
SET subject_id = mapping.new_id
FROM old_to_new_subject_mapping mapping
WHERE documents.subject_id = mapping.old_id;

-- الخطوة 3: تحديث level_id في documents أيضاً
WITH old_to_new_level_mapping AS (
  SELECT 
    old_l.id as old_id,
    new_l.id as new_id
  FROM levels old_l
  CROSS JOIN LATERAL (
    SELECT id 
    FROM levels 
    WHERE level_type = old_l.level_type 
    AND year_number = old_l.year_number
    ORDER BY created_at
    LIMIT 1
  ) new_l
)
UPDATE documents
SET level_id = mapping.new_id
FROM old_to_new_level_mapping mapping
WHERE documents.level_id = mapping.old_id;

-- الخطوة 4: حذف المواد المكررة فعلياً
DELETE FROM subjects s1
WHERE EXISTS (
  SELECT 1 FROM subjects s2
  WHERE s1.name_ar = s2.name_ar
  AND s1.level_id = s2.level_id
  AND s1.created_at > s2.created_at
);

-- الخطوة 5: حذف المستويات المكررة فعلياً
DELETE FROM levels l1
WHERE EXISTS (
  SELECT 1 FROM levels l2
  WHERE l1.level_type = l2.level_type
  AND l1.year_number = l2.year_number
  AND l1.created_at > l2.created_at
);