import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { LogIn, UserPlus, Mail, Lock, User, X, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AuthPage = () => {
  const navigate = useNavigate();
  const { user, signIn, signUp, signInWithGoogle, signInWithFacebook, signInWithOTP, verifyOTP } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [useOTP, setUseOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(loginEmail, loginPassword);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("تم تسجيل الدخول بنجاح!");
      navigate("/");
    }

    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signUp(signupEmail, signupPassword, firstName, lastName);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("تم إنشاء الحساب بنجاح! يرجى التحقق من بريدك الإلكتروني.");
    }

    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithFacebook();

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signInWithOTP(loginEmail);

    if (error) {
      toast.error("حدث خطأ أثناء إرسال رمز التحقق. يرجى المحاولة مرة أخرى.");
    } else {
      toast.success("✅ تم إرسال رمز التحقق المكون من 6 أرقام إلى بريدك الإلكتروني!");
      setOtpSent(true);
    }

    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await verifyOTP(loginEmail, otpCode);

    if (error) {
      toast.error(error.message || "رمز التحقق غير صحيح. يرجى التحقق من بريدك الإلكتروني والمحاولة مرة أخرى.");
    } else {
      toast.success("تم تسجيل الدخول بنجاح!");
      navigate("/");
    }

    setLoading(false);
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/10 to-background">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }}></div>
      </div>

      <Header />
      
      <main className="flex-1 flex items-center justify-center p-4 mt-20 relative z-10">
        <div className="w-full max-w-md relative animate-scale-in">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSkip}
            className="absolute -top-14 left-0 text-muted-foreground hover:text-foreground transition-all hover:scale-105"
          >
            <X className="h-4 w-4 ml-2" />
            تخطي
          </Button>

          <Card className="p-8 md:p-10 glass-effect border-primary/30 hover:border-primary/50 transition-all duration-500 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8 space-y-2">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gradient animate-fade-in-down">
                مرحباً بك
              </h1>
              <p className="text-muted-foreground text-base md:text-lg animate-fade-in" style={{ animationDelay: "0.1s" }}>
                سجل دخولك أو أنشئ حساباً جديداً
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <div className="w-8 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full"></div>
              </div>
            </div>

            <Tabs defaultValue="login" className="w-full" dir="rtl">
              <TabsList className="grid w-full grid-cols-2 mb-8 p-1 glass-effect">
                <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">تسجيل الدخول</TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all">إنشاء حساب</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                {!useOTP ? (
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pr-10"
                          required
                          dir="ltr"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">كلمة المرور</Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type="password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          className="pr-10"
                          required
                          dir="ltr"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full hover-lift glow-effect transition-all" disabled={loading}>
                      <LogIn className="h-4 w-4 ml-2" />
                      {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                    </Button>

                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-sm text-primary hover:text-primary/80 transition-all"
                      onClick={() => setUseOTP(true)}
                    >
                      <Shield className="h-4 w-4 ml-2" />
                      تسجيل الدخول برمز التحقق
                    </Button>
                  </form>
                ) : !otpSent ? (
                  <form onSubmit={handleSendOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp-email">البريد الإلكتروني</Label>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="otp-email"
                          type="email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="pr-10"
                          required
                          dir="ltr"
                          placeholder="email@example.com"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        سيصلك رمز مكون من 6 أرقام عبر البريد الإلكتروني
                      </p>
                    </div>

                    <Button type="submit" className="w-full hover-lift glow-effect transition-all" disabled={loading}>
                      <Shield className="h-4 w-4 ml-2" />
                      {loading ? "جاري الإرسال..." : "إرسال رمز التحقق"}
                    </Button>

                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-sm text-muted-foreground"
                      onClick={() => {
                        setUseOTP(false);
                        setOtpSent(false);
                      }}
                    >
                      العودة إلى تسجيل الدخول العادي
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOTP} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp-code">رمز التحقق</Label>
                      <div className="relative">
                        <Shield className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="otp-code"
                          type="text"
                          value={otpCode}
                          onChange={(e) => setOtpCode(e.target.value)}
                          className="pr-10 text-center tracking-widest text-lg"
                          required
                          dir="ltr"
                          placeholder="000000"
                          maxLength={6}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        تم إرسال رمز مكون من 6 أرقام إلى {loginEmail}. يرجى التحقق من بريدك الإلكتروني.
                      </p>
                    </div>

                    <Button type="submit" className="w-full hover-lift glow-effect transition-all" disabled={loading}>
                      <LogIn className="h-4 w-4 ml-2" />
                      {loading ? "جاري التحقق..." : "تأكيد"}
                    </Button>

                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-sm text-primary"
                      onClick={handleSendOTP}
                      disabled={loading}
                    >
                      إعادة إرسال الرمز
                    </Button>

                    <Button
                      type="button"
                      variant="link"
                      className="w-full text-sm text-muted-foreground"
                      onClick={() => {
                        setUseOTP(false);
                        setOtpSent(false);
                        setOtpCode("");
                      }}
                    >
                      العودة
                    </Button>
                  </form>
                )}

                {!useOTP && (
                  <div className="mt-4">
                    <div className="relative mb-4">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-card px-2 text-muted-foreground">أو</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleSignIn}
                        disabled={loading}
                      >
                        <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="currentColor"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="currentColor"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        تسجيل الدخول بواسطة Google
                      </Button>

                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleFacebookSignIn}
                        disabled={loading}
                      >
                        <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        تسجيل الدخول بواسطة Facebook
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">الاسم</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="first-name"
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="pr-10"
                          required
                          placeholder="أحمد"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="last-name">اللقب</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="last-name"
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="pr-10"
                          required
                          placeholder="محمد"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">البريد الإلكتروني</Label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="pr-10"
                        required
                        dir="ltr"
                        placeholder="email@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">كلمة المرور</Label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="pr-10"
                        required
                        dir="ltr"
                        placeholder="••••••••"
                        minLength={6}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    <UserPlus className="h-4 w-4 ml-2" />
                    {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                  </Button>
                </form>

                <div className="mt-4">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-card px-2 text-muted-foreground">أو</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                    >
                      <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      التسجيل بواسطة Google
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handleFacebookSignIn}
                      disabled={loading}
                    >
                      <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      التسجيل بواسطة Facebook
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthPage;
