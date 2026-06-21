import React, { JSX } from 'react';
import {
  CalendarCheck,
  Users,
  Clock3,
  BadgeCheck,
  Laptop,
  Sparkles,
} from 'lucide-react';
import Header from '../../_components/Header';
import Footer from '../../_components/Footer';

interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

const features: Feature[] = [
  {
    title: 'Easy Event Creation',
    description: 'Create and publish events in minutes with an intuitive dashboard.',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: 'Booking & RSVPs',
    description: 'Manage registrations, RSVPs, and event check-ins seamlessly.',
    icon: <CalendarCheck className="h-5 w-5" />,
  },
  {
    title: 'Organiser Dashboard',
    description: 'Track attendance, handle announcements, and update event details.',
    icon: <Laptop className="h-5 w-5" />,
  },
  {
    title: 'Real-Time Scheduling',
    description: 'Get live updates on event schedules and venue changes.',
    icon: <Clock3 className="h-5 w-5" />,
  },
  {
    title: 'Team Collaboration',
    description: 'Add committee members to co-manage events with defined roles.',
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Verified Access',
    description: 'Only college students or invited users can book premium events.',
    icon: <BadgeCheck className="h-5 w-5" />,
  },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />

      {/* HERO */}
      <section className="relative px-6 md:px-16 pt-40 pb-24 overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[32rem] h-[32rem] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl">
          <span className="font-mono text-orange-400 text-xs font-medium tracking-[0.2em] uppercase">
            About the platform
          </span>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mt-5">
            One place to run
            <br />
            every <span className="text-orange-500">campus event</span>.
          </h1>

          <p className="mt-8 max-w-2xl text-gray-400 text-lg leading-relaxed font-light">
            Momento is your one-stop platform to create, promote, and manage college events.
            From tech fests to dance battles, we simplify it all — for organizers and attendees alike.
          </p>
        </div>
      </section>

      {/* FEATURES — manifest style list */}
      <section className="px-6 md:px-16 py-10 border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm font-mono text-zinc-500 tracking-[0.15em] uppercase mb-12">
            What you get
          </h2>

          <div className="flex flex-col">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="group flex flex-col sm:flex-row sm:items-center gap-6 py-8 border-b border-white/10 transition-colors duration-200 hover:border-orange-500/40"
              >
                <span className="font-mono text-3xl text-zinc-700 group-hover:text-orange-500 transition-colors duration-200 sm:w-20 shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 text-orange-500 shrink-0">
                  {feature.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="text-center py-16 px-6">
        <p className="text-gray-500 text-sm font-mono">
          Built with <span className="text-orange-500">♥</span> for college communities.
        </p>
      </section>

      <Footer />
    </div>
  );
};

export default About;