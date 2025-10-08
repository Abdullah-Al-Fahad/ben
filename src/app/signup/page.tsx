'use client';
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiEye, FiEyeOff } from 'react-icons/fi'; // Icons for password visibility

// Define the validation schema with Zod
const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"], // path of error
});

// Infer the type of the form data from the schema
type FormSchemaType = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    setFormStatus('Creating your warrior profile...');
    // Simulated API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setFormStatus(`Welcome, ${data.fullName}! Your account has been created.`);
    // In a real app, you would redirect the user or clear the form here.
  };

  return (
    <main className="relative flex min-h-screen flex-col md:flex-row bg-black text-white overflow-hidden">
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-fade-in { animation: fadeIn 1s ease-out forwards; }
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

      {/* Left Column: Visual Branding */}
      <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-screen flex items-center justify-center p-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1549476464-373922117584?w=1000&q=80)` }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className={`relative z-10 text-center ${isVisible && 'animate-fade-in-up'}`}>
          <h1 className="text-5xl font-black uppercase tracking-tight">Forge Your</h1>
          <h2 className="text-7xl font-black uppercase gradient-text">Legacy</h2>
          <p className="mt-4 text-lg text-neutral-300">Join the ranks of the dedicated. Unleash your inner warrior.</p>
        </div>
      </div>

      {/* Right Column: Sign-up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 bg-neutral-950">
        <div className="w-full max-w-md">
          <div className={`text-center md:text-left ${isVisible && 'animate-fade-in-up'}`} style={{ animationDelay: '0.2s' }}>
            <h2 className="text-4xl font-bold mb-2">Create Your Account</h2>
            <p className="text-neutral-400 mb-8">
              Already a warrior? <a href="/login" className="font-bold text-red-500 hover:underline">Log In</a>
            </p>
          </div>

          {/* Social Logins */}
          <div className={`flex flex-col sm:flex-row gap-4 mb-8 ${isVisible && 'animate-fade-in-up'}`} style={{ animationDelay: '0.3s' }}>
             <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-lg transition-colors font-semibold">
                <svg className="w-6 h-6" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path></svg>
                Sign Up with Google
            </button>
          </div>
          <div className={`flex items-center my-6 ${isVisible && 'animate-fade-in-up'}`} style={{ animationDelay: '0.4s' }}>
            <hr className="w-full border-neutral-700" />
            <span className="px-4 text-neutral-500 font-semibold">OR</span>
            <hr className="w-full border-neutral-700" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className={`${isVisible && 'animate-fade-in-up'}`} style={{ animationDelay: '0.5s' }}>
              <input type="text" {...register("fullName")} placeholder="Full Name" className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
              {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
            </div>
            <div className={`${isVisible && 'animate-fade-in-up'}`} style={{ animationDelay: '0.6s' }}>
              <input type="email" {...register("email")} placeholder="Email Address" className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className={`relative ${isVisible && 'animate-fade-in-up'}`} style={{ animationDelay: '0.7s' }}>
              <input type={showPassword ? 'text' : 'password'} {...register("password")} placeholder="Password" className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-4 text-neutral-500 hover:text-white">
                {showPassword ? <FiEyeOff/> : <FiEye/>}
              </button>
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <div className={`relative ${isVisible && 'animate-fade-in-up'}`} style={{ animationDelay: '0.8s' }}>
              <input type={showConfirmPassword ? 'text' : 'password'} {...register("confirmPassword")} placeholder="Confirm Password" className="form-input w-full px-5 py-4 rounded-lg bg-neutral-800 border border-neutral-700" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 px-4 text-neutral-500 hover:text-white">
                {showConfirmPassword ? <FiEyeOff/> : <FiEye/>}
              </button>
              {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            </div>

            <div className={`${isVisible && 'animate-fade-in-up'} pt-4`} style={{ animationDelay: '0.9s' }}>
              <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full font-bold uppercase transition-all hover:shadow-lg hover:shadow-red-600/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
            {formStatus && (
              <p className={`mt-4 text-center text-sm font-medium ${formStatus.includes('Welcome') ? 'text-green-400' : 'text-yellow-400'}`}>
                  {formStatus}
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}