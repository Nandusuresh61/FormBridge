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

export const SurveyForm = () => {
  const [recaptchaToken, setRecaptchaToken] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SurveyFormValues>({
    resolver: zodResolver(surveySchema),
  });

  const onSubmit = async (data: SurveyFormValues) => {
    try {
      await createSurvey({ ...data, recaptchaToken });
      toast.success("Survey submitted successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to submit survey. Please try again.");
    }
  };

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      {" "}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-8 text-center text-white">
        {" "}
        <h1 className="text-3xl font-bold">FormBridge </h1>
        ```
        <p className="text-slate-300 mt-2">
          Share Your Information and Feedback
        </p>
      </div>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Full Name *</label>

              <Input {...register("name")} placeholder="Enter your full name" />

              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Email Address *</label>

              <Input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Gender *</label>

              <select
                {...register("gender")}
                className="w-full h-10 border rounded-md px-3"
              >
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>

                <option value="Prefer not to say">Prefer not to say</option>
              </select>

              {errors.gender && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Nationality *</label>

              <Input
                {...register("nationality")}
                placeholder="Enter nationality"
              />

              {errors.nationality && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.nationality.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Phone Number *</label>

              <Input
                {...register("phoneNumber")}
                placeholder="Enter phone number"
              />

              {errors.phoneNumber && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Address *</label>

              <Input {...register("address")} placeholder="Enter address" />

              {errors.address && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">Message *</label>

              <Textarea
                {...register("message")}
                placeholder="Enter your message"
              />

              {errors.message && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium">
                Attachment (Optional)
              </label>

              <Input type="file" accept=".jpg,.jpeg,.png,.pdf" />
            </div>

            <div className="md:col-span-2">
              <div className="border rounded-lg p-4 text-center bg-muted">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={(token: any) => {
                    setRecaptchaToken(token)
                  }}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Submit Survey
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
