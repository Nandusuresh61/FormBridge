import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  surveySchema,
  type SurveyFormValues,
} from "@/validators/survery.validator";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ReCAPTCHA from "react-google-recaptcha";
import { createSurvey } from "@/services/survey/survey.api";
import { useState } from "react";
import { toast } from "sonner";
import {
  User,
  Mail,
  HelpCircle,
  Globe,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Loader2,
  Check
} from "lucide-react";

import { getCountryDataList, getEmojiFlag } from "countries-list";

// Generate unique country list sorted alphabetically
const countries = getCountryDataList()
  .map((c) => c.name)
  .sort((a, b) => a.localeCompare(b));

// Generate sorted phone prefixes with flag emoji and iso code
const phonePrefixes = getCountryDataList()
  .filter((c) => c.phone && c.phone.length > 0)
  .map((c) => ({
    code: `+${c.phone[0]}`,
    name: c.name,
    emoji: getEmojiFlag(c.iso2),
    iso2: c.iso2,
  }))
  .filter((prefix, index, self) =>
    self.findIndex(p => p.code === prefix.code && p.emoji === prefix.emoji) === index
  )
  .sort((a, b) => a.name.localeCompare(b.name));

export const SurveyForm = () => {
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+91");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
  });

  const onSubmit = async (data: SurveyFormValues) => {
    try {
      const combinedData = {
        ...data,
        phoneNumber: `${phonePrefix} ${data.phoneNumber}`,
        recaptchaToken,
      };
      await createSurvey(combinedData);
      toast.success("Survey submitted successfully!");
      setIsSubmitted(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit survey. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-slate-50 to-indigo-50/30 py-8 px-4 sm:px-6 lg:px-8 xl:py-16 flex items-center justify-center font-sans antialiased">
      <Card className="max-w-7xl w-full mx-auto overflow-hidden border border-slate-200/60 shadow-[0_32px_60px_-15px_rgba(99,102,241,0.08)] bg-white rounded-3xl transition-all duration-300 hover:shadow-[0_40px_80px_-15px_rgba(99,102,241,0.12)]">
        <div className="grid lg:grid-cols-12 min-h-[750px]">

          {/* Left Panel: Hero Graphic & Context Branding */}
          <div className="lg:col-span-5 xl:col-span-4 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800">
            {/* Ambient Background Radial Glow Blur */}
            <div className="absolute -top-10 -right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-10">
              {/* Product Mark Accent */}
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  FormBridge
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-white sm:text-4xl">
                  Share Your <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
                    Information & Feedback
                  </span>
                </h1>
                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Please take a few moments to provide your information. Your verified insights help build better dashboard interfaces and optimize processing loops.
                </p>
              </div>
            </div>

            {/* Premium Indicator Footer */}
            <div className="relative z-10 pt-6 border-t border-slate-800/60 hidden lg:flex items-center justify-between text-xs text-slate-500">
              <span>© 2026 FormBridge System</span>
            </div>
          </div>

          {/* Right Panel: Clean Form Fields Layout */}
          <CardContent className="lg:col-span-7 xl:col-span-8 p-6 sm:p-10 lg:p-12 bg-white flex flex-col justify-center">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 px-4 animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-sm shadow-emerald-500/10">
                  <Check className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Survey Submitted Successfully!</h2>
                  <p className="text-slate-500 text-sm max-w-md leading-relaxed">
                    Thank you for sharing your feedback and information. We have successfully recorded your response in our secure datastore.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setRecaptchaToken("");
                    reset();
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200"
                >
                  Submit Another Response
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Form Segment 1: Personal Attributes */}
                <div className="space-y-5">
                  <div className="flex items-center space-x-2.5 pb-2.5 border-b border-slate-100">
                    <span className="h-5 w-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-extrabold uppercase">
                      01
                    </span>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Personal Identity</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="h-4 w-4" />
                        </span>
                        <Input
                          {...register("name")}
                          placeholder="Enter your full name"
                          className={`h-11 pl-10 bg-slate-50/40 border-slate-200/80 rounded-xl focus-visible:ring-4 focus-visible:ring-indigo-500/5 focus-visible:border-indigo-500 focus-visible:bg-white hover:bg-slate-50/80 hover:border-slate-300 transition-all duration-200 ${errors.name ? 'border-red-300 bg-red-50/10 focus-visible:border-red-500 focus-visible:ring-red-500/5' : ''}`}
                        />
                      </div>
                      {errors.name && (
                        <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="h-4 w-4" />
                        </span>
                        <Input
                          type="email"
                          {...register("email")}
                          placeholder="Enter your email"
                          className={`h-11 pl-10 bg-slate-50/40 border-slate-200/80 rounded-xl focus-visible:ring-4 focus-visible:ring-indigo-500/5 focus-visible:border-indigo-500 focus-visible:bg-white hover:bg-slate-50/80 hover:border-slate-300 transition-all duration-200 ${errors.email ? 'border-red-300 bg-red-50/10 focus-visible:border-red-500 focus-visible:ring-red-500/5' : ''}`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Gender *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <HelpCircle className="h-4 w-4" />
                        </span>
                        <select
                          {...register("gender")}
                          className={`w-full h-11 border border-slate-200/80 rounded-xl bg-slate-50/40 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 pl-10 pr-10 text-sm appearance-none cursor-pointer transition-all duration-200 ${errors.gender ? 'border-red-300 bg-red-50/10 focus:ring-red-500/5' : ''}`}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.gender && (
                        <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.gender.message}
                        </p>
                      )}
                    </div>

                    {/* Nationality */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nationality *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Globe className="h-4 w-4" />
                        </span>
                        <select
                          {...register("nationality")}
                          className={`w-full h-11 border border-slate-200/80 rounded-xl bg-slate-50/40 hover:bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 pl-10 pr-10 text-sm appearance-none cursor-pointer transition-all duration-200 ${errors.nationality ? 'border-red-300 bg-red-50/10 focus:ring-red-500/5' : ''}`}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                      {errors.nationality && (
                        <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.nationality.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Form Segment 2: Localization Information */}
                <div className="space-y-5">
                  <div className="flex items-center space-x-2.5 pb-2.5 border-b border-slate-100">
                    <span className="h-5 w-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-extrabold uppercase">
                      02
                    </span>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Communication Nodes</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Phone Number *</label>
                      <div className={`relative flex rounded-xl border bg-slate-50/40 focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-500 focus-within:bg-white hover:border-slate-300 transition-all duration-200 overflow-hidden ${errors.phoneNumber ? 'border-red-300 bg-red-50/10 focus-within:ring-red-500/5' : 'border-slate-200/80'}`}>

                        {/* Prefix Selector */}
                        <div className="relative flex items-center border-r border-slate-200/80 bg-slate-50/50">
                          <select
                            value={phonePrefix}
                            onChange={(e) => setPhonePrefix(e.target.value)}
                            className="h-11 pl-3 pr-8 bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer appearance-none"
                          >
                            {phonePrefixes.map((prefix) => (
                              <option key={`${prefix.iso2}-${prefix.code}`} value={prefix.code}>
                                {prefix.emoji} {prefix.code} ({prefix.iso2})
                              </option>
                            ))}
                          </select>
                          <span className="absolute right-2.5 pointer-events-none text-slate-400">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </div>

                        {/* Base Input */}
                        <div className="relative flex-1 flex items-center">
                          <span className="absolute left-3.5 pointer-events-none text-slate-400">
                            <Phone className="h-4 w-4" />
                          </span>
                          <input
                            type="tel"
                            {...register("phoneNumber")}
                            placeholder="Enter phone number"
                            className="w-full h-11 pl-10 pr-4 bg-transparent outline-none border-none text-sm placeholder:text-slate-400 text-slate-800 focus:ring-0 focus:outline-none"
                          />
                        </div>
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Address *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <MapPin className="h-4 w-4" />
                        </span>
                        <Input
                          {...register("address")}
                          placeholder="Enter address"
                          className={`h-11 pl-10 bg-slate-50/40 border-slate-200/80 rounded-xl focus-visible:ring-4 focus-visible:ring-indigo-500/5 focus-visible:border-indigo-500 focus-visible:bg-white hover:bg-slate-50/80 hover:border-slate-300 transition-all duration-200 ${errors.address ? 'border-red-300 bg-red-50/10 focus-visible:border-red-500 focus-visible:ring-red-500/5' : ''}`}
                        />
                      </div>
                      {errors.address && (
                        <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Message *</label>
                      <div className="relative">
                        <span className="absolute top-3.5 left-3.5 text-slate-400">
                          <MessageSquare className="h-4 w-4" />
                        </span>
                        <Textarea
                          {...register("message")}
                          placeholder="Enter your detailed message here..."
                          rows={4}
                          className={`pl-10 bg-slate-50/40 border-slate-200/80 rounded-xl focus-visible:ring-4 focus-visible:ring-indigo-500/5 focus-visible:border-indigo-500 focus-visible:bg-white hover:bg-slate-50/80 hover:border-slate-300 min-h-[100px] transition-all duration-200 ${errors.message ? 'border-red-300 bg-red-50/10 focus-visible:border-red-500 focus-visible:ring-red-500/5' : ''}`}
                        />
                      </div>
                      {errors.message && (
                        <p className="text-xs font-medium text-red-500 mt-1.5 flex items-center gap-1">
                          <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* reCAPTCHA Block */}
                    <div className="sm:col-span-2 pt-2">
                      <div className="border border-slate-200/80 rounded-xl p-4 flex justify-center bg-slate-50/50 backdrop-blur-sm shadow-inner shadow-slate-100">
                        <ReCAPTCHA
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                          onChange={(token: any) => {
                            setRecaptchaToken(token)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Submit Dispatch Trigger */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 hover:from-indigo-700 hover:via-indigo-800 hover:to-violet-800 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/15 hover:shadow-indigo-600/25 border-0 flex items-center justify-center space-x-2 transition-all duration-300 transform active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                      <span>Submitting response...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Form Response</span>
                      <Send className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>

        </div>
      </Card>
    </div>
  );
};