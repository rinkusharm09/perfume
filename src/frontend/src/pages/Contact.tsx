import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSubmitting(false);
    toast.success("Message received", {
      description: "We will respond within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="pt-28 pb-24">
      {/* Page header */}
      <section className="px-6 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] uppercase text-rose-gold font-sans-body mb-3"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl font-light text-foreground mb-5"
          >
            Contact Us
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-16 h-px mx-auto mb-6"
            style={{
              background: "var(--rose-gold)",
              transformOrigin: "center",
            }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-base text-muted-foreground font-sans-body max-w-xl mx-auto leading-relaxed"
          >
            We would love to hear from you. Reach out to us for any inquiry,
            bespoke fragrance consultation, or wholesale opportunity.
          </motion.p>
        </div>
      </section>

      {/* Split layout */}
      <section className="px-6" data-ocid="contact.section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Brand info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-10"
            >
              <div>
                <h2 className="font-serif text-3xl font-light text-foreground mb-2">
                  House of Luxuries Perfume
                </h2>
                <div
                  className="w-10 h-px"
                  style={{ background: "var(--rose-gold)" }}
                />
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--rose-gold-muted)" }}
                  >
                    <MapPin size={16} className="text-rose-gold" />
                  </div>
                  <div>
                    <p className="font-sans-body text-sm font-semibold text-foreground mb-0.5">
                      Our Atelier
                    </p>
                    <p className="text-sm text-muted-foreground font-sans-body leading-relaxed">
                      House of Luxuries Perfume
                      <br />
                      Bandra West, Mumbai 400050
                      <br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--rose-gold-muted)" }}
                  >
                    <Mail size={16} className="text-rose-gold" />
                  </div>
                  <div>
                    <p className="font-sans-body text-sm font-semibold text-foreground mb-0.5">
                      Email
                    </p>
                    <p className="text-sm text-muted-foreground font-sans-body">
                      hello@luxuriesperfume.in
                    </p>
                    <p className="text-sm text-muted-foreground font-sans-body">
                      wholesale@luxuriesperfume.in
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--rose-gold-muted)" }}
                  >
                    <Phone size={16} className="text-rose-gold" />
                  </div>
                  <div>
                    <p className="font-sans-body text-sm font-semibold text-foreground mb-0.5">
                      Phone
                    </p>
                    <p className="text-sm text-muted-foreground font-sans-body">
                      +91 98765 43210
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--rose-gold-muted)" }}
                  >
                    <Clock size={16} className="text-rose-gold" />
                  </div>
                  <div>
                    <p className="font-sans-body text-sm font-semibold text-foreground mb-0.5">
                      Hours
                    </p>
                    <p className="text-sm text-muted-foreground font-sans-body">
                      Monday – Saturday: 10:00 – 19:00
                      <br />
                      Sunday: 11:00 – 17:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative quote */}
              <div
                className="border-l-2 pl-5 py-2"
                style={{ borderColor: "var(--rose-gold)" }}
              >
                <p className="font-serif text-base italic text-muted-foreground leading-relaxed">
                  &ldquo;Every great fragrance begins with a conversation. Tell
                  us your story.&rdquo;
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card border border-border rounded-sm p-8 space-y-6"
                data-ocid="contact.modal"
              >
                <div className="space-y-2">
                  <Label
                    htmlFor="contact-name"
                    className="text-xs tracking-[0.15em] uppercase font-sans-body text-foreground"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="contact-name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Your name"
                    required
                    className="rounded-sm border-border font-sans-body"
                    data-ocid="contact.input"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-email"
                    className="text-xs tracking-[0.15em] uppercase font-sans-body text-foreground"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="you@example.com"
                    required
                    className="rounded-sm border-border font-sans-body"
                    data-ocid="contact.input"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-xs tracking-[0.15em] uppercase font-sans-body text-foreground">
                    Subject
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(v) =>
                      setFormData((p) => ({ ...p, subject: v }))
                    }
                    required
                  >
                    <SelectTrigger
                      className="rounded-sm border-border font-sans-body"
                      data-ocid="contact.select"
                    >
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="order">Order Support</SelectItem>
                      <SelectItem value="wholesale">Wholesale</SelectItem>
                      <SelectItem value="press">Press</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="contact-message"
                    className="text-xs tracking-[0.15em] uppercase font-sans-body text-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="contact-message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, message: e.target.value }))
                    }
                    placeholder="Tell us how we can help..."
                    required
                    rows={5}
                    className="rounded-sm border-border font-sans-body resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-sm font-sans-body text-xs tracking-[0.2em] uppercase text-white"
                  style={{ background: "var(--rose-gold)" }}
                  data-ocid="contact.submit_button"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
