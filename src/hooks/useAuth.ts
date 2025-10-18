import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          first_name: firstName,
          last_name: lastName,
        }
      }
    });
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { error };
  };

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      }
    });
    
    return { error };
  };

  const signInWithFacebook = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/`,
      }
    });
    
    return { error };
  };

  const signInWithOTP = async (email: string) => {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP in session storage with timestamp
      sessionStorage.setItem('otp_data', JSON.stringify({
        email,
        otp,
        timestamp: Date.now()
      }));
      
      // Send OTP via edge function
      const { error: functionError } = await supabase.functions.invoke('send-otp-email', {
        body: { email, otp }
      });
      
      if (functionError) {
        console.error('Error sending OTP:', functionError);
        return { error: functionError };
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Error in signInWithOTP:', error);
      return { error };
    }
  };

  const verifyOTP = async (email: string, token: string) => {
    try {
      // Get stored OTP data
      const otpDataString = sessionStorage.getItem('otp_data');
      if (!otpDataString) {
        return { error: { message: 'لم يتم العثور على رمز التحقق. يرجى طلب رمز جديد.' } };
      }
      
      const otpData = JSON.parse(otpDataString);
      
      // Check if OTP expired (5 minutes)
      const fiveMinutes = 5 * 60 * 1000;
      if (Date.now() - otpData.timestamp > fiveMinutes) {
        sessionStorage.removeItem('otp_data');
        return { error: { message: 'انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.' } };
      }
      
      // Verify OTP matches
      if (otpData.email !== email || otpData.otp !== token) {
        return { error: { message: 'رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.' } };
      }
      
      // Sign up or sign in the user
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: `${window.location.origin}/`,
        }
      });
      
      if (error) {
        return { error };
      }
      
      // Clear OTP data
      sessionStorage.removeItem('otp_data');
      
      return { error: null };
    } catch (error: any) {
      console.error('Error in verifyOTP:', error);
      return { error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithFacebook,
    signInWithOTP,
    verifyOTP,
    signOut,
  };
};
