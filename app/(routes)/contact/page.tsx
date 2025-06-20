import React from 'react';
import Header from '../../_components/Header';
import Footer from '../../_components/Footer';
import { Card, CardContent } from '../../../components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />
      <section className="w-full">
        {/* Top Hero Section */}
        <div className="bg-black text-white px-6 py-40 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Contact <span className='text-orange-500'>Us</span>
            </h1>
            <p className="text-gray-300 text-lg">
              We’d love to hear from you. Reach out and let's connect!
            </p>
          </div>
        </div>

        <div className="text-center mt-16 px-4">
          <p className="text-orange-500 uppercase text-sm font-medium mb-2 tracking-wide">
            Contact
          </p>
          <h2 className="text-3xl font-bold mb-4">Get in Touch With Us</h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm md:text-base">
            Feel free to reach out via phone, email, or visit our head office. We’ll be happy to help.
          </p>
        </div>

        {/* Cards Section */}
        <div className="mt-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Phone */}
          <Card className="bg-black text-white rounded-2xl shadow-md hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out">
            <CardContent className="flex flex-col items-center text-center py-8 px-4">
              <Phone className="text-orange-500 mb-4 w-8 h-8" />
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-300 text-sm">+91 9876543210</p>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="bg-black text-white rounded-2xl shadow-md hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out">
            <CardContent className="flex flex-col items-center text-center py-8 px-4">
              <Mail className="text-orange-500 mb-4 w-8 h-8" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-300 text-sm">hello@momento.ai</p>
            </CardContent>
          </Card>

          {/* Head Office */}
          <Card className="bg-black text-white rounded-2xl shadow-md hover:scale-105 hover:-translate-y-2 transition-transform duration-300 ease-in-out">
            <CardContent className="flex flex-col items-center text-center py-8 px-4">
              <MapPin className="text-orange-500 mb-4 w-8 h-8" />
              <h3 className="text-xl font-semibold mb-2">Head Office</h3>
              <p className="text-gray-300 text-sm">123 MG Road, Delhi, India</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <br />
      <Footer />
    </div>
  );
};

export default Contact;
