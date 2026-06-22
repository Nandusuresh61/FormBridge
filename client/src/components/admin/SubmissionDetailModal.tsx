import { useState, useEffect } from "react";
import type { Submission } from "../../types/admin.types";
import {
  X,
  MapPin,
  MessageSquare,
  ExternalLink,
  User,
  Mail,
  Phone,
  Globe,
  Calendar,
  Copy,
  Check,
  FileText
} from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface SubmissionDetailModalProps {
  submission: Submission | null;
  onClose: () => void;
}

export default function SubmissionDetailModal({
  submission,
  onClose
}: SubmissionDetailModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!submission) return null;

  const handleCopyText = async (text: string, type: "email" | "phone") => {
    try {
      await navigator.clipboard.writeText(text);
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
      toast.success(`${type === "email" ? "Email" : "Phone number"} copied to clipboard!`);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      {/* Modal Backdrop click */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Modal Box */}
      <div
        className="relative w-full max-w-2xl bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-[0_0_50px_-12px_rgba(34,197,94,0.12)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle green glow header bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#22C55E] to-[#10B981]" />

        {/* Modal Header */}
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E] animate-pulse" />
              Submission Details
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Survey ID: <span className="font-mono text-white/50">{submission.surveyId}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
          {/* Section: Demographics & Profile Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                <User className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
                  Full Name
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5 truncate">
                  {submission.name}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                <Mail className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
                  Email Address
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5 truncate">
                  {submission.email}
                </span>
              </div>
              <button
                onClick={() => handleCopyText(submission.email, "email")}
                className="p-1.5 rounded hover:bg-white/5 text-muted-foreground hover:text-white transition-colors cursor-pointer self-center"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Phone */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                <Phone className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
                  Phone Number
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5 truncate">
                  {submission.phoneNumber}
                </span>
              </div>
              <button
                onClick={() => handleCopyText(submission.phoneNumber, "phone")}
                className="p-1.5 rounded hover:bg-white/5 text-muted-foreground hover:text-white transition-colors cursor-pointer self-center"
                title="Copy Phone"
              >
                {copiedPhone ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Demographics (Gender & Nationality) */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex-grow">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
                  Demographics
                </span>
                <div className="flex flex-wrap gap-2 mt-1.5">
                  <span className="inline-flex items-center rounded-md bg-[#22C55E]/10 px-2 py-0.5 text-xs font-semibold text-[#22C55E] border border-[#22C55E]/20">
                    {submission.gender}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-white/5 px-2 py-0.5 text-xs font-semibold text-muted-foreground border border-white/10">
                    {submission.nationality}
                  </span>
                </div>
              </div>
            </div>

            {/* Date Submitted */}
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-4 sm:col-span-2 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-[#22C55E]/10 text-[#22C55E]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold block">
                  Date Submitted
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5">
                  {new Date(submission.createdAt).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Section: Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>Address / Location</span>
            </div>
            <div className="text-sm bg-black/40 border border-white/5 rounded-xl p-4 text-foreground leading-relaxed">
              {submission.address}
            </div>
          </div>

          {/* Section: Message */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5 text-[#22C55E]" />
              <span>User Message</span>
            </div>
            <div className="text-sm bg-black/40 border border-white/5 rounded-xl p-4 text-foreground leading-relaxed whitespace-pre-wrap font-sans">
              {submission.message || <span className="text-muted-foreground italic">No message provided.</span>}
            </div>
          </div>

          {/* Section: Attachment (if present) */}
          {submission.attachmentUrl && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5 text-[#22C55E]" />
                <span>Uploaded Attachment</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/[0.01] hover:bg-white/[0.02] border border-white/5 rounded-xl p-4 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Survey File / Media Attachment</span>
                    <span className="text-xs text-muted-foreground">Click the button to view or download</span>
                  </div>
                </div>
                <a
                  href={submission.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 h-9 rounded-lg bg-[#22C55E] hover:bg-[#22C55E]/90 text-black font-semibold text-xs transition-colors w-full sm:w-auto cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Attachment</span>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/5 bg-black/30 flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="hover:bg-white/5 text-muted-foreground hover:text-white cursor-pointer"
          >
            Close Details
          </Button>
        </div>
      </div>
    </div>
  );
}
