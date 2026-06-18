import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const SurveyForm = () => {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>FormBridge Survey</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Input placeholder="Full Name" />

        <Input placeholder="Gender" />

        <Input placeholder="Nationality" />

        <Input placeholder="Email Address" />

        <Input placeholder="Phone Number" />

        <Input placeholder="Address" />

        <Textarea placeholder="Message" />

        <Input type="file" />

        <Button className="w-full">
          Submit
        </Button>
      </CardContent>
    </Card>
  );
};