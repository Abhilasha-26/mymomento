import React from 'react';
import {
  CalendarCheck,
  Users,
  Clock3,
  BadgeCheck,
  Laptop,
  Sparkles,
} from 'lucide-react';
import { Card, CardContent } from '../../../components/ui/card';
import Header from '../../_components/Header';
import Footer from '../../_components/Footer';

// Define type for a single feature
interface Feature {
  title: string;
  description: string;
  icon: JSX.Element;
}

// Features array with proper typing
const features: Feature[] = [
  {
    title: 'Easy Event Creation',
    description: 'Create and publish events in minutes with an intuitive dashboard.',
    icon: <Sparkles className="h-6 w-6 text-orange-500" />,
  },
  {
    title: 'Booking & RSVPs',
    description: 'Manage registrations, RSVPs, and event check-ins seamlessly.',
    icon: <CalendarCheck className="h-6 w-6 text-orange-500" />,
  },
  {
    title: 'Organiser Dashboard',
    description: 'Track attendance, handle announcements, and update event details.',
    icon: <Laptop className="h-6 w-6 text-orange-500" />,
  },
  {
    title: 'Real-Time Scheduling',
    description: 'Get live updates on event schedules and venue changes.',
    icon: <Clock3 className="h-6 w-6 text-orange-500" />,
  },
  {
    title: 'Team Collaboration',
    description: 'Add committee members to co-manage events with defined roles.',
    icon: <Users className="h-6 w-6 text-orange-500" />,
  },
  {
    title: 'Verified Access',
    description: 'Only college students or invited users can book premium events.',
    icon: <BadgeCheck className="h-6 w-6 text-orange-500" />,
  },
];

// Proper PascalCase function name and return type
const About: React.FC = ()=> {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <section className="text-center px-6 py-20">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
          <span className="text-orange-500">Momento</span>
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-gray-300 text-lg">
          Momento is your one-stop platform to create, promote, and manage college events. From tech fests to dance battles, we simplify it all—for organizers and attendees alike.
        </p>
        <div className="mt-10 text-gray-500 text-sm italic">Scroll down to explore features ↓</div>
      </section>

      <section className="px-6 md:px-16 py-16">
        <h2 className="text-3xl font-semibold mb-12 text-center">
          Why <span className="text-orange-500">Use</span> Momento?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-black border border-zinc-400 shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center py-12 px-6 text-gray-400 text-sm">
        Built with ❤️ for college communities.
      </section>

      <Footer />
    </div>
  );
};

export default About;
