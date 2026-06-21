import Header from '../../_components/Header';
import Footer from '../../_components/Footer';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* HERO */}
      <section className="relative px-6 md:px-16 pt-40 pb-20 overflow-hidden">
        <div className="absolute -top-32 right-1/4 w-[28rem] h-[28rem] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl">
          <span className="font-mono text-orange-400 text-xs font-medium tracking-[0.2em] uppercase">
            Get in touch
          </span>

          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-5">
            Let&apos;s <span className="text-orange-500">talk</span>.
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed font-light max-w-xl">
            Questions, feedback, or just want to say hi — reach out through
            whichever channel works best for you.
          </p>
        </div>
      </section>

      {/* CONTACT LIST */}
      <section className="px-6 md:px-16 pb-24 border-t border-white/10">
        <div className="max-w-4xl mx-auto">

          {/* Phone */}
          <a
            href="tel:+919876543210"
            className="group flex items-center justify-between gap-6 py-8 border-b border-white/10 transition-colors duration-200 hover:border-orange-500/40"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-orange-500 shrink-0">
                <Phone className="w-5 h-5" />
              </div>

              <div>
                <p className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase mb-1">
                  Phone
                </p>

                <p className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                  +91 98765 43210
                </p>
              </div>
            </div>

            <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-orange-500 transition-colors shrink-0" />
          </a>

          {/* Email */}
          <a
            href="mailto:hello@momento.ai"
            className="group flex items-center justify-between gap-6 py-8 border-b border-white/10 transition-colors duration-200 hover:border-orange-500/40"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-orange-500 shrink-0">
                <Mail className="w-5 h-5" />
              </div>

              <div>
                <p className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase mb-1">
                  Email
                </p>

                <p className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                  hello@momento.ai
                </p>
              </div>
            </div>

            <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-orange-500 transition-colors shrink-0" />
          </a>

          {/* Address */}
          <a
            href="https://maps.google.com/?q=123+MG+Road+Delhi+India"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-6 py-8 border-b border-white/10 transition-colors duration-200 hover:border-orange-500/40"
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-orange-500 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>

              <div>
                <p className="font-mono text-xs text-zinc-500 tracking-[0.15em] uppercase mb-1">
                  Head Office
                </p>

                <p className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors">
                  123 MG Road, Delhi, India
                </p>
              </div>
            </div>

            <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-orange-500 transition-colors shrink-0" />
          </a>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;