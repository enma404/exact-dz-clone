-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to handle new user signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.email
  );
  RETURN new;
END;
$$;

-- Create trigger for new user signups
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Add complete subjects for all secondary branches
-- Get level IDs for secondary years
DO $$
DECLARE
  secondary_year1_id UUID;
  secondary_year2_id UUID;
  secondary_year3_id UUID;
  branch_sciences_id UUID;
  branch_math_id UUID;
  branch_tech_id UUID;
  branch_eco_id UUID;
  branch_lit_id UUID;
  branch_lang_id UUID;
BEGIN
  -- Get secondary level IDs
  SELECT id INTO secondary_year1_id FROM public.levels WHERE level_type = 'secondary' AND year_number = 1;
  SELECT id INTO secondary_year2_id FROM public.levels WHERE level_type = 'secondary' AND year_number = 2;
  SELECT id INTO secondary_year3_id FROM public.levels WHERE level_type = 'secondary' AND year_number = 3;

  -- Get branch IDs for year 2 and 3
  SELECT id INTO branch_sciences_id FROM public.branches WHERE name_ar = 'علوم تجريبية' AND level_id = secondary_year2_id;
  SELECT id INTO branch_math_id FROM public.branches WHERE name_ar = 'رياضيات' AND level_id = secondary_year2_id;
  SELECT id INTO branch_tech_id FROM public.branches WHERE name_ar = 'تقني رياضي' AND level_id = secondary_year2_id;
  SELECT id INTO branch_eco_id FROM public.branches WHERE name_ar = 'تسيير واقتصاد' AND level_id = secondary_year2_id;
  SELECT id INTO branch_lit_id FROM public.branches WHERE name_ar = 'آداب وفلسفة' AND level_id = secondary_year2_id;
  SELECT id INTO branch_lang_id FROM public.branches WHERE name_ar = 'لغات أجنبية' AND level_id = secondary_year2_id;

  -- Insert subjects for Sciences branch (Year 2 & 3)
  INSERT INTO public.subjects (name, name_ar, level_id, branch_id, icon_name) VALUES
  ('Mathematics', 'الرياضيات', secondary_year2_id, branch_sciences_id, 'calculator'),
  ('Physics', 'الفيزياء', secondary_year2_id, branch_sciences_id, 'atom'),
  ('Natural Sciences', 'العلوم الطبيعية', secondary_year2_id, branch_sciences_id, 'leaf'),
  ('Arabic', 'اللغة العربية', secondary_year2_id, branch_sciences_id, 'book-open'),
  ('French', 'اللغة الفرنسية', secondary_year2_id, branch_sciences_id, 'languages'),
  ('English', 'اللغة الإنجليزية', secondary_year2_id, branch_sciences_id, 'message-circle'),
  ('Islamic Education', 'التربية الإسلامية', secondary_year2_id, branch_sciences_id, 'book'),
  ('Philosophy', 'الفلسفة', secondary_year2_id, branch_sciences_id, 'brain'),
  ('History & Geography', 'التاريخ والجغرافيا', secondary_year2_id, branch_sciences_id, 'map')
  ON CONFLICT DO NOTHING;

  -- Insert subjects for Math branch (Year 2 & 3)
  INSERT INTO public.subjects (name, name_ar, level_id, branch_id, icon_name) VALUES
  ('Mathematics', 'الرياضيات', secondary_year2_id, branch_math_id, 'calculator'),
  ('Physics', 'الفيزياء', secondary_year2_id, branch_math_id, 'atom'),
  ('Natural Sciences', 'العلوم الطبيعية', secondary_year2_id, branch_math_id, 'leaf'),
  ('Arabic', 'اللغة العربية', secondary_year2_id, branch_math_id, 'book-open'),
  ('French', 'اللغة الفرنسية', secondary_year2_id, branch_math_id, 'languages'),
  ('English', 'اللغة الإنجليزية', secondary_year2_id, branch_math_id, 'message-circle'),
  ('Islamic Education', 'التربية الإسلامية', secondary_year2_id, branch_math_id, 'book'),
  ('Philosophy', 'الفلسفة', secondary_year2_id, branch_math_id, 'brain'),
  ('History & Geography', 'التاريخ والجغرافيا', secondary_year2_id, branch_math_id, 'map')
  ON CONFLICT DO NOTHING;

  -- Insert subjects for Tech branch (Year 2 & 3)
  INSERT INTO public.subjects (name, name_ar, level_id, branch_id, icon_name) VALUES
  ('Mathematics', 'الرياضيات', secondary_year2_id, branch_tech_id, 'calculator'),
  ('Physics', 'الفيزياء', secondary_year2_id, branch_tech_id, 'atom'),
  ('Engineering', 'الهندسة', secondary_year2_id, branch_tech_id, 'cog'),
  ('Arabic', 'اللغة العربية', secondary_year2_id, branch_tech_id, 'book-open'),
  ('French', 'اللغة الفرنسية', secondary_year2_id, branch_tech_id, 'languages'),
  ('English', 'اللغة الإنجليزية', secondary_year2_id, branch_tech_id, 'message-circle'),
  ('Islamic Education', 'التربية الإسلامية', secondary_year2_id, branch_tech_id, 'book'),
  ('Philosophy', 'الفلسفة', secondary_year2_id, branch_tech_id, 'brain'),
  ('History & Geography', 'التاريخ والجغرافيا', secondary_year2_id, branch_tech_id, 'map')
  ON CONFLICT DO NOTHING;

  -- Insert subjects for Economics branch (Year 2 & 3)
  INSERT INTO public.subjects (name, name_ar, level_id, branch_id, icon_name) VALUES
  ('Mathematics', 'الرياضيات', secondary_year2_id, branch_eco_id, 'calculator'),
  ('Economics', 'الاقتصاد والمناجمنت', secondary_year2_id, branch_eco_id, 'trending-up'),
  ('Law', 'القانون', secondary_year2_id, branch_eco_id, 'scale'),
  ('Accounting', 'المحاسبة', secondary_year2_id, branch_eco_id, 'file-text'),
  ('Arabic', 'اللغة العربية', secondary_year2_id, branch_eco_id, 'book-open'),
  ('French', 'اللغة الفرنسية', secondary_year2_id, branch_eco_id, 'languages'),
  ('English', 'اللغة الإنجليزية', secondary_year2_id, branch_eco_id, 'message-circle'),
  ('Islamic Education', 'التربية الإسلامية', secondary_year2_id, branch_eco_id, 'book'),
  ('Philosophy', 'الفلسفة', secondary_year2_id, branch_eco_id, 'brain'),
  ('History & Geography', 'التاريخ والجغرافيا', secondary_year2_id, branch_eco_id, 'map')
  ON CONFLICT DO NOTHING;

  -- Insert subjects for Literature branch (Year 2 & 3)
  INSERT INTO public.subjects (name, name_ar, level_id, branch_id, icon_name) VALUES
  ('Philosophy', 'الفلسفة', secondary_year2_id, branch_lit_id, 'brain'),
  ('Arabic Literature', 'الأدب العربي', secondary_year2_id, branch_lit_id, 'book-open'),
  ('Arabic', 'اللغة العربية', secondary_year2_id, branch_lit_id, 'type'),
  ('French', 'اللغة الفرنسية', secondary_year2_id, branch_lit_id, 'languages'),
  ('English', 'اللغة الإنجليزية', secondary_year2_id, branch_lit_id, 'message-circle'),
  ('History & Geography', 'التاريخ والجغرافيا', secondary_year2_id, branch_lit_id, 'map'),
  ('Islamic Education', 'التربية الإسلامية', secondary_year2_id, branch_lit_id, 'book')
  ON CONFLICT DO NOTHING;

  -- Insert subjects for Foreign Languages branch (Year 2 & 3)
  INSERT INTO public.subjects (name, name_ar, level_id, branch_id, icon_name) VALUES
  ('English', 'اللغة الإنجليزية', secondary_year2_id, branch_lang_id, 'message-circle'),
  ('French', 'اللغة الفرنسية', secondary_year2_id, branch_lang_id, 'languages'),
  ('Spanish', 'اللغة الإسبانية', secondary_year2_id, branch_lang_id, 'globe'),
  ('Arabic', 'اللغة العربية', secondary_year2_id, branch_lang_id, 'book-open'),
  ('History & Geography', 'التاريخ والجغرافيا', secondary_year2_id, branch_lang_id, 'map'),
  ('Philosophy', 'الفلسفة', secondary_year2_id, branch_lang_id, 'brain'),
  ('Islamic Education', 'التربية الإسلامية', secondary_year2_id, branch_lang_id, 'book')
  ON CONFLICT DO NOTHING;

END $$;