-- إضافة وثائق لجميع المستويات والمواد
DO $$
DECLARE
  subject_record RECORD;
  doc_counter INTEGER;
BEGIN
  -- إضافة وثائق لكل مادة
  FOR subject_record IN 
    SELECT id, name_ar, level_id FROM public.subjects
  LOOP
    -- إضافة 5-10 وثائق لكل مادة
    FOR doc_counter IN 1..8 LOOP
      INSERT INTO public.documents (
        title,
        title_ar,
        subject_id,
        level_id,
        file_type,
        year,
        term,
        downloads_count,
        views_count
      ) VALUES (
        subject_record.name_ar || ' - Document ' || doc_counter,
        subject_record.name_ar || ' - وثيقة ' || doc_counter,
        subject_record.id,
        subject_record.level_id,
        CASE (doc_counter % 4)
          WHEN 0 THEN 'exam'::file_type
          WHEN 1 THEN 'homework'::file_type
          WHEN 2 THEN 'summary'::file_type
          ELSE 'exercise'::file_type
        END,
        CASE 
          WHEN doc_counter <= 3 THEN 2024
          WHEN doc_counter <= 6 THEN 2023
          ELSE 2022
        END,
        CASE (doc_counter % 3)
          WHEN 0 THEN 1
          WHEN 1 THEN 2
          ELSE 3
        END,
        floor(random() * 100)::integer,
        floor(random() * 500)::integer
      );
    END LOOP;
  END LOOP;
END $$;