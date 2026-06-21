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
  MapPin,
  MessageSquare,
  Send,
  Loader2,
  Check
} from "lucide-react";

import { countries, phonePrefixes } from "@/data/countryData";

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
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification before submitting.");
      return;
    }

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

  /* ── Shared class fragments ── */
  const inputBase =
    "h-11 pl-10 rounded-xl border bg-[#1a1a1a] text-white placeholder:text-[#A1A1AA] " +
    "transition-all duration-200 " +
    "hover:border-[#22C55E]/40 hover:bg-[#1f1f1f] " +
    "focus-visible:border-[#22C55E] focus-visible:ring-4 focus-visible:ring-[#22C55E]/15 focus-visible:bg-[#1f1f1f] " +
    "focus-visible:shadow-[0_0_0_4px_rgba(34,197,94,0.08),0_0_20px_rgba(34,197,94,0.06)]";

  const inputError =
    "border-red-500/60 focus-visible:border-red-500 focus-visible:ring-red-500/15 focus-visible:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]";

  const inputNormal = "border-[#2a2a2a]";

  const selectBase =
    "w-full h-11 rounded-xl border bg-[#1a1a1a] text-white appearance-none cursor-pointer " +
    "pl-10 pr-10 text-sm transition-all duration-200 focus:outline-none " +
    "hover:border-[#22C55E]/40 hover:bg-[#1f1f1f] " +
    "focus:border-[#22C55E] focus:ring-4 focus:ring-[#22C55E]/15 focus:bg-[#1f1f1f] " +
    "focus:shadow-[0_0_0_4px_rgba(34,197,94,0.08),0_0_20px_rgba(34,197,94,0.06)]";

  const sectionBadgeBase =
    "h-5 w-5 rounded-md flex items-center justify-center text-[10px] font-extrabold uppercase " +
    "bg-[#22C55E]/10 text-[#22C55E]";

  const sectionDivider = "flex items-center space-x-2.5 pb-2.5 border-b border-[#2a2a2a]";

  const sectionLabel = "text-xs font-bold text-[#A1A1AA] uppercase tracking-wider";

  const fieldLabel = "text-xs font-bold text-[#A1A1AA] uppercase tracking-wide";

  const errorMsg =
    "text-xs font-medium text-red-400 mt-1.5 flex items-center gap-1.5";

  const chevronIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  const iconWrapper = "absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A1A1AA]";

  return (
    <div className="min-h-screen bg-[#0A0A0A] py-8 px-4 sm:px-6 lg:px-8 xl:py-16 flex items-center justify-center font-sans antialiased">
      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#22C55E]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/3 rounded-full blur-[100px]" />
      </div>

      <Card className="relative max-w-7xl w-full mx-auto overflow-hidden bg-[#121212] border border-[#1e1e1e] rounded-3xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(34,197,94,0.04)] transition-all duration-300 hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.9),0_0_0_1px_rgba(34,197,94,0.08)]">
        <div className="grid lg:grid-cols-12 min-h-[750px]">

          {/* ── Left Panel: Branding ── */}
          <div className="lg:col-span-5 xl:col-span-4 bg-[#0e0e0e] p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#1e1e1e]">
            {/* Ambient glow blobs */}
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-[#22C55E]/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-[#10B981]/6 rounded-full blur-3xl pointer-events-none" />
            {/* Subtle grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.02]"
              style={{
                backgroundImage: `linear-gradient(rgba(34,197,94,0.5) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(34,197,94,0.5) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 space-y-10">
              {/* Logo mark */}
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-[#22C55E] to-[#10B981] flex items-center justify-center shadow-lg shadow-[#22C55E]/25">
                  <svg className="w-5 h-5 text-[#0A0A0A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  FormBridge
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-extrabold tracking-tight leading-tight text-white sm:text-4xl">
                  Share Your <br className="hidden lg:block" />
                  <span className="bg-gradient-to-r from-[#22C55E] via-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                    Information &amp; Feedback
                  </span>
                </h1>
                <p className="text-[#A1A1AA] text-sm leading-relaxed max-w-sm">
                  Please take a few moments to provide your information. Your verified insights help build better dashboard interfaces and optimize processing loops.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 pt-6 border-t border-[#1e1e1e] hidden lg:flex items-center justify-between text-xs text-[#3f3f3f]">
              <span>© 2026 FormBridge System</span>
            </div>
          </div>

          {/* ── Right Panel: Form ── */}
          <CardContent className="lg:col-span-7 xl:col-span-8 p-6 sm:p-10 lg:p-12 bg-[#121212] flex flex-col justify-center">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 px-4 animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/25 flex items-center justify-center text-[#22C55E] shadow-lg shadow-[#22C55E]/10">
                  <Check className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight">Survey Submitted Successfully!</h2>
                  <p className="text-[#A1A1AA] text-sm max-w-md leading-relaxed">
                    Thank you for sharing your feedback and information. We have successfully recorded your response in our secure datastore.
                  </p>
                </div>
                <Button
                  onClick={() => {
                    setIsSubmitted(false);
                    setRecaptchaToken("");
                    reset();
                  }}
                  className="bg-gradient-to-r from-[#22C55E] to-[#10B981] hover:from-[#16a34a] hover:to-[#059669] text-[#0A0A0A] font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-[#22C55E]/20 hover:shadow-[#22C55E]/30 transition-all duration-300 border-0"
                >
                  Submit Another Response
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* ── Section 01: Personal Identity ── */}
                <div className="space-y-5">
                  <div className={sectionDivider}>
                    <span className={sectionBadgeBase}>01</span>
                    <h3 className={sectionLabel}>Personal Identity</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className={fieldLabel}>Full Name *</label>
                      <div className="relative">
                        <span className={iconWrapper}><User className="h-4 w-4" /></span>
                        <Input
                          {...register("name")}
                          placeholder="Enter your full name"
                          className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
                        />
                      </div>
                      {errors.name && (
                        <p className={errorMsg}>
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                      <label className={fieldLabel}>Email Address *</label>
                      <div className="relative">
                        <span className={iconWrapper}><Mail className="h-4 w-4" /></span>
                        <Input
                          type="email"
                          {...register("email")}
                          placeholder="Enter your email"
                          className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
                        />
                      </div>
                      {errors.email && (
                        <p className={errorMsg}>
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Gender */}
                    <div className="space-y-1.5">
                      <label className={fieldLabel}>Gender *</label>
                      <div className="relative">
                        <span className={iconWrapper}><HelpCircle className="h-4 w-4" /></span>
                        <select
                          {...register("gender")}
                          className={`${selectBase} ${errors.gender ? "border-red-500/60" : "border-[#2a2a2a]"}`}
                        >
                          <option value="" className="bg-[#1a1a1a]">Select Gender</option>
                          <option value="Male" className="bg-[#1a1a1a]">Male</option>
                          <option value="Female" className="bg-[#1a1a1a]">Female</option>
                          <option value="Other" className="bg-[#1a1a1a]">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#A1A1AA]">
                          {chevronIcon}
                        </div>
                      </div>
                      {errors.gender && (
                        <p className={errorMsg}>
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.gender.message}
                        </p>
                      )}
                    </div>

                    {/* Nationality */}
                    <div className="space-y-1.5">
                      <label className={fieldLabel}>Nationality *</label>
                      <div className="relative">
                        <span className={iconWrapper}><Globe className="h-4 w-4" /></span>
                        <select
                          {...register("nationality")}
                          className={`${selectBase} ${errors.nationality ? "border-red-500/60" : "border-[#2a2a2a]"}`}
                        >
                          <option value="" className="bg-[#1a1a1a]">Select Country</option>
                          {countries.map((country) => (
                            <option key={country} value={country} className="bg-[#1a1a1a]">
                              {country}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-[#A1A1AA]">
                          {chevronIcon}
                        </div>
                      </div>
                      {errors.nationality && (
                        <p className={errorMsg}>
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.nationality.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* ── Section 02: Communication Nodes ── */}
                <div className="space-y-5">
                  <div className={sectionDivider}>
                    <span className={sectionBadgeBase}>02</span>
                    <h3 className={sectionLabel}>Communication Nodes</h3>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label className={fieldLabel}>Phone Number *</label>
                      <div
                        className={`relative flex rounded-xl border bg-[#1a1a1a] transition-all duration-200 overflow-hidden
                          focus-within:border-[#22C55E] focus-within:ring-4 focus-within:ring-[#22C55E]/15
                          focus-within:shadow-[0_0_0_4px_rgba(34,197,94,0.08),0_0_20px_rgba(34,197,94,0.06)]
                          hover:border-[#22C55E]/40
                          ${errors.phoneNumber ? "border-red-500/60" : "border-[#2a2a2a]"}`}
                      >
                        {/* Prefix Selector */}
                        <div className="relative flex items-center border-r border-[#2a2a2a] bg-[#161616]">
                          <select
                            value={phonePrefix}
                            onChange={(e) => setPhonePrefix(e.target.value)}
                            className="h-11 pl-3 pr-8 bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer appearance-none"
                          >
                            {phonePrefixes.map((prefix) => (
                              <option key={`${prefix.iso2}-${prefix.code}`} value={prefix.code} className="bg-[#1a1a1a]">
                                {prefix.emoji} {prefix.code} ({prefix.iso2})
                              </option>
                            ))}
                          </select>
                          <span className="absolute right-2.5 pointer-events-none text-[#A1A1AA]">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                            </svg>
                          </span>
                        </div>

                        {/* Base Input */}
                        <div className="relative flex-1 flex items-center">
                          <input
                            type="tel"
                            {...register("phoneNumber")}
                            placeholder="Enter phone number"
                            className="w-full h-11 pl-4 pr-4 bg-transparent outline-none border-none text-sm placeholder:text-[#A1A1AA] text-white focus:ring-0 focus:outline-none"
                          />
                        </div>
                      </div>
                      {errors.phoneNumber && (
                        <p className={errorMsg}>
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.phoneNumber.message}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div className="space-y-1.5">
                      <label className={fieldLabel}>Address *</label>
                      <div className="relative">
                        <span className={iconWrapper}><MapPin className="h-4 w-4" /></span>
                        <Input
                          {...register("address")}
                          placeholder="Enter address"
                          className={`${inputBase} ${errors.address ? inputError : inputNormal}`}
                        />
                      </div>
                      {errors.address && (
                        <p className={errorMsg}>
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.address.message}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className={fieldLabel}>Message *</label>
                      <div className="relative">
                        <span className="absolute top-3.5 left-3.5 text-[#A1A1AA]">
                          <MessageSquare className="h-4 w-4" />
                        </span>
                        <Textarea
                          {...register("message")}
                          placeholder="Enter your detailed message here..."
                          rows={4}
                          className={`pl-10 rounded-xl border bg-[#1a1a1a] text-white placeholder:text-[#A1A1AA]
                            min-h-[100px] transition-all duration-200
                            hover:border-[#22C55E]/40 hover:bg-[#1f1f1f]
                            focus-visible:border-[#22C55E] focus-visible:ring-4 focus-visible:ring-[#22C55E]/15
                            focus-visible:shadow-[0_0_0_4px_rgba(34,197,94,0.08),0_0_20px_rgba(34,197,94,0.06)]
                            focus-visible:bg-[#1f1f1f]
                            ${errors.message ? "border-red-500/60" : "border-[#2a2a2a]"}`}
                        />
                      </div>
                      {errors.message && (
                        <p className={errorMsg}>
                          <span className="inline-block w-1 h-1 rounded-full bg-red-400" />
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* reCAPTCHA Block */}
                    <div className="sm:col-span-2 pt-2">
                      <div className="border border-[#2a2a2a] rounded-xl p-4 flex justify-center bg-[#161616] backdrop-blur-sm">
                        <ReCAPTCHA
                          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                          onChange={(token: any) => {
                            setRecaptchaToken(token);
                          }}
                          theme="dark"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Submit Button ── */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-gradient-to-r from-[#22C55E] to-[#10B981]
                    hover:from-[#16a34a] hover:to-[#059669]
                    text-[#0A0A0A] font-bold text-sm rounded-xl border-0
                    shadow-lg shadow-[#22C55E]/20
                    hover:shadow-[#22C55E]/35 hover:shadow-xl
                    transition-all duration-300 transform active:scale-[0.99]
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                    flex items-center justify-center space-x-2
                    [&:not(:disabled)]:hover:[box-shadow:0_0_30px_rgba(34,197,94,0.25),0_10px_40px_rgba(34,197,94,0.15)]"
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