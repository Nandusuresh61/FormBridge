import { SurveyForm } from "@/components/survey/SurveyForm";

export default function SurveyPage() {
  return (
    <main className="min-h-screen bg-muted/20 py-10">
      <div className="container mx-auto">
        <SurveyForm />
      </div>
    </main>
  );
}