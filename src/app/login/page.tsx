'use client';
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiEye, FiEyeOff } from 'react-icons/fi';

// Define the validation schema with Zod for the login form
const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// Infer the type of the form data from the schema
type FormSchemaType = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formStatus, setFormStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleFormSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    setFormStatus('Authenticating...');
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate success/failure for demonstration
    if (data.email === "warrior@test.com" && data.password === "password") {
         setFormStatus(`Login successful! Welcome back.`);
    } else {
         setFormStatus('Invalid email or password.');
    }
  };

  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-black text-white overflow-hidden"
      style={{
        backgroundImage: `url(https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200&q=80)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-black/70 z-0"></div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .gradient-text {
          background: linear-gradient(135deg, #dc2626 0%, #f87171 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .form-input:focus {
          border-color: #dc2626;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.3);
          outline: none;
        }
        .error-message {
          color: #f87171;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }
      `}</style>

      {/* Centered Form Container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Branding Header */}
        <div className={`text-center mb-10 ${isVisible && 'animate-fade-in-up'}`}>
          <h1 className="text-5xl font-black uppercase tracking-tight">Welcome Back</h1>
          <h2 className="text-7xl font-black uppercase gradient-text">Warrior</h2>
          <p className="mt-4 text-lg text-neutral-300">Your next challenge awaits.</p>
        </div>

        {/* Form Card */}
        <div className={`bg-neutral-900/70 backdrop-blur-md border border-neutral-700 rounded-2xl p-8 ${isVisible && 'animate-fade-in-up'}`} style={{ animationDelay: '0.2s' }}>
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Log In to Your Account</h2>
            <p className="text-neutral-400 mt-2">
              New here? <a href="/signup" className="font-bold text-red-500 hover:underline">Create an Account</a>
            </p>
          </div>

          {/* Social Logins */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
             <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors font-semibold">
                <svg className="w-6 h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                Log In with Google
            </button>
          </div>
          <div className="flex items-center my-6">
            <hr className="w-full border-neutral-700" />
            <span className="px-4 text-neutral-500 font-semibold text-sm">OR</span>
            <hr className="w-full border-neutral-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div>
              <input type="email" {...register("email")} placeholder="Email Address" className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} {...register("password")} placeholder="Password" className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 text-neutral-500 hover:text-white">
                {showPassword ? <FiEyeOff/> : <FiEye/>}
              </button>
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
             <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-neutral-400 select-none">
                    <input type="checkbox" className="h-4 w-4 bg-neutral-700 border-neutral-600 text-red-600 focus:ring-red-500 rounded"/>
                    Remember Me
                </label>
                <a href="#" className="text-sm font-semibold text-red-500 hover:underline">Forgot Password?</a>
            </div>
            <div className="pt-2">
              <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold uppercase transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Logging In...' : 'Log In'}
              </button>
            </div>
            {formStatus && (
              <p className={`mt-4 text-center text-sm font-medium ${formStatus.includes('Invalid') ? 'text-yellow-400' : 'text-green-400'}`}>
                  {formStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}