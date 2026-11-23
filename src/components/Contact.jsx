import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Copy, 
  Sparkles
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!formData.email.includes('@')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulated network delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background ambient glowing spheres */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-accent-violet/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-accent-electric/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple text-xs font-semibold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">Extraordinary</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind, need a custom WordPress site, or want to discuss a collaboration? Feel free to reach out anytime.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Socials */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Email Card with 1-Click Copy */}
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple to-accent-electric" />
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-purple">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-slate-400">Direct Email</p>
                  <h4 className="text-base font-bold text-white">wasiwebsolution@gmail.com</h4>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                Send your inquiry directly. I typically reply within 24 hours to discuss project scope, timeline, and quotes.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-violet hover:bg-accent-purple text-white text-xs font-semibold shadow-glow-purple transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-dark-850 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-accent-electric" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Details Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2.5 text-accent-purple mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">Location</span>
                </div>
                <p className="text-sm font-semibold text-white">{personalInfo.location}</p>
                <p className="text-xs text-slate-400 mt-0.5">Available for remote work worldwide</p>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2.5 text-accent-electric mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-400">Availability</span>
                </div>
                <p className="text-sm font-semibold text-white">Full-Time & Freelance</p>
                <p className="text-xs text-slate-400 mt-0.5">Quick turnaround guaranteed</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Connect on Social Networks
              </h5>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition group"
                >
                  <GithubIcon className="w-4 h-4 text-accent-purple group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">GitHub</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition group"
                >
                  <LinkedinIcon className="w-4 h-4 text-accent-electric group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </a>

                <a
                  href="https://wa.me/923000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">WhatsApp</span>
                </a>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition group"
                >
                  <Mail className="w-4 h-4 text-pink-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-medium">Email</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 relative">
              
              <h3 className="text-xl font-bold text-white mb-1">Send a Message</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill out the details below and I'll get back to you shortly.
              </p>

              {/* Status Notifications */}
              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-semibold">Message delivered successfully!</p>
                    <p className="text-xs text-emerald-400/80">Thank you for reaching out. Wasi will respond within 24 hours.</p>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mb-6 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Your Name <span className="text-accent-purple">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-slate-700/80 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple text-sm text-white placeholder-slate-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-300">
                      Your Email <span className="text-accent-purple">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-slate-700/80 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple text-sm text-white placeholder-slate-500 outline-none transition"
                      required
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Project Subject / Service
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. WordPress Redesign, E-Commerce Store, Maintenance"
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-slate-700/80 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple text-sm text-white placeholder-slate-500 outline-none transition"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">
                    Your Message <span className="text-accent-purple">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your website goals, requirements, timeline, or any questions..."
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-slate-700/80 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple text-sm text-white placeholder-slate-500 outline-none transition resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition-all duration-300 disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message Now</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
