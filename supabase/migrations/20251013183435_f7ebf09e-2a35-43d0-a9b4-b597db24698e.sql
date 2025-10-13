-- إضافة مستويات الابتدائي
INSERT INTO public.levels (name, name_ar, level_type, year_number, description, display_order) VALUES
('Primary Year 1', 'السنة الأولى ابتدائي', 'primary', 1, 'المرحلة الابتدائية - السنة الأولى', 1),
('Primary Year 2', 'السنة الثانية ابتدائي', 'primary', 2, 'المرحلة الابتدائية - السنة الثانية', 2),
('Primary Year 3', 'السنة الثالثة ابتدائي', 'primary', 3, 'المرحلة الابتدائية - السنة الثالثة', 3),
('Primary Year 4', 'السنة الرابعة ابتدائي', 'primary', 4, 'المرحلة الابتدائية - السنة الرابعة', 4),
('Primary Year 5', 'السنة الخامسة ابتدائي', 'primary', 5, 'المرحلة الابتدائية - السنة الخامسة', 5);

-- إضافة مستويات المتوسط
INSERT INTO public.levels (name, name_ar, level_type, year_number, description, display_order) VALUES
('Middle Year 1', 'السنة الأولى متوسط', 'middle', 1, 'المرحلة المتوسطة - السنة الأولى', 6),
('Middle Year 2', 'السنة الثانية متوسط', 'middle', 2, 'المرحلة المتوسطة - السنة الثانية', 7),
('Middle Year 3', 'السنة الثالثة متوسط', 'middle', 3, 'المرحلة المتوسطة - السنة الثالثة', 8),
('Middle Year 4', 'السنة الرابعة متوسط', 'middle', 4, 'المرحلة المتوسطة - السنة الرابعة (شهادة التعليم المتوسط)', 9);

-- الحصول على معرفات المستويات للاستخدام لاحقاً
DO $$
DECLARE
  primary_1_id uuid;
  primary_2_id uuid;
  primary_3_id uuid;
  primary_4_id uuid;
  primary_5_id uuid;
  middle_1_id uuid;
  middle_2_id uuid;
  middle_3_id uuid;
  middle_4_id uuid;
  secondary_1_id uuid;
  secondary_2_id uuid;
  secondary_3_id uuid;
BEGIN
  -- الحصول على معرفات المستويات
  SELECT id INTO primary_1_id FROM public.levels WHERE name = 'Primary Year 1';
  SELECT id INTO primary_2_id FROM public.levels WHERE name = 'Primary Year 2';
  SELECT id INTO primary_3_id FROM public.levels WHERE name = 'Primary Year 3';
  SELECT id INTO primary_4_id FROM public.levels WHERE name = 'Primary Year 4';
  SELECT id INTO primary_5_id FROM public.levels WHERE name = 'Primary Year 5';
  SELECT id INTO middle_1_id FROM public.levels WHERE name = 'Middle Year 1';
  SELECT id INTO middle_2_id FROM public.levels WHERE name = 'Middle Year 2';
  SELECT id INTO middle_3_id FROM public.levels WHERE name = 'Middle Year 3';
  SELECT id INTO middle_4_id FROM public.levels WHERE name = 'Middle Year 4';
  SELECT id INTO secondary_1_id FROM public.levels WHERE name = 'Secondary Year 1';
  SELECT id INTO secondary_2_id FROM public.levels WHERE name = 'Secondary Year 2';
  SELECT id INTO secondary_3_id FROM public.levels WHERE name = 'Secondary Year 3';

  -- إضافة مواد الابتدائي
  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', primary_1_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', primary_1_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', primary_1_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', primary_1_id, 'مادة التربية المدنية', '🏛️'),
  ('Arts', 'التربية الفنية', primary_1_id, 'مادة التربية الفنية', '🎨'),
  ('Physical Education', 'التربية البدنية', primary_1_id, 'مادة التربية البدنية', '⚽');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', primary_2_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', primary_2_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', primary_2_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', primary_2_id, 'مادة التربية المدنية', '🏛️'),
  ('French Language', 'اللغة الفرنسية', primary_2_id, 'مادة اللغة الفرنسية', '🇫🇷');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', primary_3_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', primary_3_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', primary_3_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', primary_3_id, 'مادة التربية المدنية', '🏛️'),
  ('French Language', 'اللغة الفرنسية', primary_3_id, 'مادة اللغة الفرنسية', '🇫🇷'),
  ('Science', 'العلوم الطبيعية', primary_3_id, 'مادة العلوم الطبيعية', '🔬');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', primary_4_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', primary_4_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', primary_4_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', primary_4_id, 'مادة التربية المدنية', '🏛️'),
  ('French Language', 'اللغة الفرنسية', primary_4_id, 'مادة اللغة الفرنسية', '🇫🇷'),
  ('Science', 'العلوم الطبيعية', primary_4_id, 'مادة العلوم الطبيعية', '🔬'),
  ('History', 'التاريخ', primary_4_id, 'مادة التاريخ', '📜'),
  ('Geography', 'الجغرافيا', primary_4_id, 'مادة الجغرافيا', '🗺️');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', primary_5_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', primary_5_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', primary_5_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', primary_5_id, 'مادة التربية المدنية', '🏛️'),
  ('French Language', 'اللغة الفرنسية', primary_5_id, 'مادة اللغة الفرنسية', '🇫🇷'),
  ('Science', 'العلوم الطبيعية', primary_5_id, 'مادة العلوم الطبيعية', '🔬'),
  ('History', 'التاريخ', primary_5_id, 'مادة التاريخ', '📜'),
  ('Geography', 'الجغرافيا', primary_5_id, 'مادة الجغرافيا', '🗺️');

  -- إضافة مواد المتوسط
  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', middle_1_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', middle_1_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', middle_1_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', middle_1_id, 'مادة التربية المدنية', '🏛️'),
  ('French Language', 'اللغة الفرنسية', middle_1_id, 'مادة اللغة الفرنسية', '🇫🇷'),
  ('English Language', 'اللغة الإنجليزية', middle_1_id, 'مادة اللغة الإنجليزية', '🇬🇧'),
  ('Natural Sciences', 'العلوم الطبيعية', middle_1_id, 'مادة العلوم الطبيعية', '🔬'),
  ('History', 'التاريخ', middle_1_id, 'مادة التاريخ', '📜'),
  ('Geography', 'الجغرافيا', middle_1_id, 'مادة الجغرافيا', '🗺️'),
  ('Physics', 'الفيزياء', middle_1_id, 'مادة الفيزياء', '⚛️'),
  ('Technology', 'التكنولوجيا', middle_1_id, 'مادة التكنولوجيا', '🔧'),
  ('Music Education', 'التربية الموسيقية', middle_1_id, 'مادة التربية الموسيقية', '🎵');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', middle_2_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', middle_2_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', middle_2_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', middle_2_id, 'مادة التربية المدنية', '🏛️'),
  ('French Language', 'اللغة الفرنسية', middle_2_id, 'مادة اللغة الفرنسية', '🇫🇷'),
  ('English Language', 'اللغة الإنجليزية', middle_2_id, 'مادة اللغة الإنجليزية', '🇬🇧'),
  ('Natural Sciences', 'العلوم الطبيعية', middle_2_id, 'مادة العلوم الطبيعية', '🔬'),
  ('History', 'التاريخ', middle_2_id, 'مادة التاريخ', '📜'),
  ('Geography', 'الجغرافيا', middle_2_id, 'مادة الجغرافيا', '🗺️'),
  ('Physics', 'الفيزياء', middle_2_id, 'مادة الفيزياء', '⚛️'),
  ('Technology', 'التكنولوجيا', middle_2_id, 'مادة التكنولوجيا', '🔧'),
  ('Informatics', 'الإعلام الآلي', middle_2_id, 'مادة الإعلام الآلي', '💻');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', middle_3_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', middle_3_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', middle_3_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', middle_3_id, 'مادة التربية المدنية', '🏛️'),
  ('French Language', 'اللغة الفرنسية', middle_3_id, 'مادة اللغة الفرنسية', '🇫🇷'),
  ('English Language', 'اللغة الإنجليزية', middle_3_id, 'مادة اللغة الإنجليزية', '🇬🇧'),
  ('Natural Sciences', 'العلوم الطبيعية', middle_3_id, 'مادة العلوم الطبيعية', '🔬'),
  ('History', 'التاريخ', middle_3_id, 'مادة التاريخ', '📜'),
  ('Geography', 'الجغرافيا', middle_3_id, 'مادة الجغرافيا', '🗺️'),
  ('Physics', 'الفيزياء', middle_3_id, 'مادة الفيزياء', '⚛️'),
  ('Informatics', 'الإعلام الآلي', middle_3_id, 'مادة الإعلام الآلي', '💻');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Arabic Language', 'اللغة العربية', middle_4_id, 'مادة اللغة العربية', '📖'),
  ('Mathematics', 'الرياضيات', middle_4_id, 'مادة الرياضيات', '🔢'),
  ('Islamic Education', 'التربية الإسلامية', middle_4_id, 'مادة التربية الإسلامية', '🕌'),
  ('Civic Education', 'التربية المدنية', middle_4_id, 'مادة التربية المدنية', '🏛️'),
  ('French Language', 'اللغة الفرنسية', middle_4_id, 'مادة اللغة الفرنسية', '🇫🇷'),
  ('English Language', 'اللغة الإنجليزية', middle_4_id, 'مادة اللغة الإنجليزية', '🇬🇧'),
  ('Natural Sciences', 'العلوم الطبيعية', middle_4_id, 'مادة العلوم الطبيعية', '🔬'),
  ('History', 'التاريخ', middle_4_id, 'مادة التاريخ', '📜'),
  ('Geography', 'الجغرافيا', middle_4_id, 'مادة الجغرافيا', '🗺️'),
  ('Physics', 'الفيزياء', middle_4_id, 'مادة الفيزياء', '⚛️'),
  ('Informatics', 'الإعلام الآلي', middle_4_id, 'مادة الإعلام الآلي', '💻');

  -- إضافة مواد الثانوية (جميع الشعب)
  -- شعبة العلوم التجريبية
  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Mathematics - Science', 'الرياضيات - علوم', secondary_2_id, 'شعبة العلوم التجريبية', '🔢'),
  ('Natural Sciences', 'العلوم الطبيعية', secondary_2_id, 'شعبة العلوم التجريبية', '🧬'),
  ('Chemistry', 'الكيمياء', secondary_2_id, 'شعبة العلوم التجريبية', '⚗️'),
  ('Biology', 'علم الأحياء', secondary_2_id, 'شعبة العلوم التجريبية', '🦠');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Mathematics - Science', 'الرياضيات - علوم', secondary_3_id, 'شعبة العلوم التجريبية', '🔢'),
  ('Natural Sciences', 'العلوم الطبيعية', secondary_3_id, 'شعبة العلوم التجريبية', '🧬'),
  ('Chemistry', 'الكيمياء', secondary_3_id, 'شعبة العلوم التجريبية', '⚗️'),
  ('Biology', 'علم الأحياء', secondary_3_id, 'شعبة العلوم التجريبية', '🦠');

  -- شعبة الرياضيات
  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Mathematics - Math', 'الرياضيات - رياضيات', secondary_2_id, 'شعبة الرياضيات', '📐'),
  ('Math Sciences', 'العلوم الرياضية', secondary_2_id, 'شعبة الرياضيات', '∑'),
  ('Geometry', 'الهندسة', secondary_2_id, 'شعبة الرياضيات', '📏');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Mathematics - Math', 'الرياضيات - رياضيات', secondary_3_id, 'شعبة الرياضيات', '📐'),
  ('Math Sciences', 'العلوم الرياضية', secondary_3_id, 'شعبة الرياضيات', '∑');

  -- شعبة الآداب والفلسفة
  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Philosophy', 'الفلسفة', secondary_2_id, 'شعبة الآداب والفلسفة', '🤔'),
  ('Literature - Arabic', 'الأدب العربي', secondary_2_id, 'شعبة الآداب والفلسفة', '✍️'),
  ('Arabic Literature Advanced', 'الأدب العربي المتقدم', secondary_2_id, 'شعبة الآداب والفلسفة', '📚');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Philosophy', 'الفلسفة', secondary_3_id, 'شعبة الآداب والفلسفة', '🤔'),
  ('Literature - Arabic', 'الأدب العربي', secondary_3_id, 'شعبة الآداب والفلسفة', '✍️'),
  ('Critical Thinking', 'التفكير النقدي', secondary_3_id, 'شعبة الآداب والفلسفة', '💭');

  -- شعبة اللغات الأجنبية
  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('French Advanced', 'اللغة الفرنسية المتقدمة', secondary_2_id, 'شعبة اللغات الأجنبية', '🇫🇷'),
  ('English Advanced', 'اللغة الإنجليزية المتقدمة', secondary_2_id, 'شعبة اللغات الأجنبية', '🇬🇧'),
  ('Spanish', 'اللغة الإسبانية', secondary_2_id, 'شعبة اللغات الأجنبية', '🇪🇸');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('French Advanced', 'اللغة الفرنسية المتقدمة', secondary_3_id, 'شعبة اللغات الأجنبية', '🇫🇷'),
  ('English Advanced', 'اللغة الإنجليزية المتقدمة', secondary_3_id, 'شعبة اللغات الأجنبية', '🇬🇧'),
  ('German', 'اللغة الألمانية', secondary_3_id, 'شعبة اللغات الأجنبية', '🇩🇪');

  -- شعبة تسيير واقتصاد
  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Economics', 'الاقتصاد', secondary_2_id, 'شعبة تسيير واقتصاد', '💰'),
  ('Management', 'التسيير', secondary_2_id, 'شعبة تسيير واقتصاد', '📊'),
  ('Accounting', 'المحاسبة', secondary_2_id, 'شعبة تسيير واقتصاد', '🧮');

  INSERT INTO public.subjects (name, name_ar, level_id, description, icon_name) VALUES
  ('Economics', 'الاقتصاد', secondary_3_id, 'شعبة تسيير واقتصاد', '💰'),
  ('Management', 'التسيير', secondary_3_id, 'شعبة تسيير واقتصاد', '📊'),
  ('Business Law', 'القانون التجاري', secondary_3_id, 'شعبة تسيير واقتصاد', '⚖️');

END $$;