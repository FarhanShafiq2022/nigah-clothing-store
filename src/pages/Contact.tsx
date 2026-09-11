import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { useNavigation } from '../context/NavigationContext';
import { useAtelier } from '../context/AtelierContext';

const FAQS = [
  {
    q: 'How far in advance should I book a bespoke bridal or formal couture consultation?',
    a: 'For bridal ensembles and hand-tilla formals requiring extensive marori or zardozi embroidery, we recommend scheduling an appointment 3 to 6 months prior to your celebration. Ready-to-wear styling fittings can be accommodated within 48 to 72 hours.'
  },
  {
    q: 'Do you offer international shipping and bespoke virtual fittings?',
    a: 'Yes. We deliver via insured express DHL courier worldwide (typically 3 to 5 business days). For overseas patrons in London, New York, Toronto, and the GCC, our Senior Stylist conducts private high-definition video consultations with physical fabric swatch kits dispatched in advance.'
  },
  {
    q: 'Can existing collection pieces be tailored to custom body measurements?',
    a: 'Absolutely. Every piece crafted by the House of Nigah can be custom tailored to your exact measurements at no additional fee through our Made-to-Measure program.'
  },
  {
    q: 'What is your alteration and satisfaction guarantee?',
    a: 'We provide complimentary lifetime alterations on all bespoke couture garments at our Lahore and Karachi ateliers. If a piece does not drape to perfection upon arrival, our master tailors will alter or adjust it with priority courier handling.'
  }
];

export const Contact: React.FC = () => {
  const { navigate } = useNavigation();
  const { showToast } = useAtelier();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'Bespoke Haute Couture Fitting',
    studioLocation: 'Gulberg Flagship Atelier, Lahore',
    preferredDate: '',
    preferredTime: 'Afternoon (2:00 PM - 5:00 PM)',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) {
      showToast('Please provide your name and email address.');
      return;
    }
    setSubmitted(true);
    showToast('Consultation request dispatched to Atelier Concierge');
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="py-28 sm:py-36 px-4 sm:px-8 lg:px-14 max-w-7xl mx-auto text-[#F5F2EA]">
      {/* Breadcrumb */}
      <div className="flex items-center justify-center sm:justify-start space-x-2 text-[10px] tracking-[0.25em] text-[#888] uppercase mb-8 font-light">
        <button onClick={() => navigate('/')} className="hover:text-[#C9A24D] transition-colors cursor-pointer">
          Home
        </button>
        <span>/</span>
        <span className="text-[#C9A24D]">Contact & Concierge</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[10px] tracking-[0.35em] text-[#C9A24D] uppercase block mb-3 font-medium">
          CLIENT CONCIERGE & APPOINTMENTS
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#F5F2EA] tracking-wide font-normal mb-4">
          Reserve Your Private Atelier Experience
        </h1>
        <p className="text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed">
          Whether you desire a private fitting for bridal couture, a tailored bandhgala consultation, or bespoke international styling, our concierge is at your service.
        </p>
      </div>

      {/* Main Grid: Form + Studio Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-28">
        {/* Left Column: Interactive Booking Form */}
        <div className="lg:col-span-7 bg-[#0E0E0E] border border-[#222] p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="py-16 text-center space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#181818] border border-[#C9A24D] flex items-center justify-center text-[#C9A24D]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5F2EA]">
                Appointment Request Received
              </h3>
              <p className="text-xs sm:text-sm text-[#A1A1AA] font-light max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-[#E0C27A]">{formData.fullName}</strong>. Our Senior Client Concierge will contact you within 4 business hours via phone/WhatsApp to confirm your private suite fitting.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      service: 'Bespoke Haute Couture Fitting',
                      studioLocation: 'Gulberg Flagship Atelier, Lahore',
                      preferredDate: '',
                      preferredTime: 'Afternoon (2:00 PM - 5:00 PM)',
                      notes: ''
                    });
                  }}
                  className="py-2.5 px-6 border border-[#333] hover:border-[#C9A24D] text-xs tracking-[0.2em] uppercase text-[#F5F2EA] hover:text-[#C9A24D] transition-colors cursor-pointer"
                >
                  Book Another Appointment
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#222] pb-4">
                <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EA] mb-1">
                  Private Fitting & Inquiry Form
                </h3>
                <p className="text-xs text-[#777] font-light">
                  Please specify your preferences to prepare your personalized atelier suite.
                </p>
              </div>

              {/* Full Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#C9A24D] uppercase mb-1.5 font-medium">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Lady / Sir Full Name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F2EA] placeholder-[#555] focus:outline-none focus:border-[#C9A24D] tracking-wider"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#C9A24D] uppercase mb-1.5 font-medium">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@luxury.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F2EA] placeholder-[#555] focus:outline-none focus:border-[#C9A24D] tracking-wider"
                  />
                </div>
              </div>

              {/* Phone & Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#C9A24D] uppercase mb-1.5 font-medium">
                    WHATSAPP / PHONE
                  </label>
                  <input
                    type="tel"
                    placeholder="+92 321-7655369"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F2EA] placeholder-[#555] focus:outline-none focus:border-[#C9A24D] tracking-wider"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#C9A24D] uppercase mb-1.5 font-medium">
                    CONSULTATION TYPE
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F2EA] focus:outline-none focus:border-[#C9A24D] tracking-wider cursor-pointer"
                  >
                    <option value="Bespoke Haute Couture Fitting">Bespoke Haute Couture Fitting</option>
                    <option value="Bridal Troussier Consultation">Bridal Troussier Consultation</option>
                    <option value="Made-to-Measure Menswear">Made-to-Measure Menswear</option>
                    <option value="Virtual Global Video Consultation">Virtual Global Video Consultation</option>
                  </select>
                </div>
              </div>

              {/* Studio Location & Preferred Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#C9A24D] uppercase mb-1.5 font-medium">
                    ATELIER DESTINATION
                  </label>
                  <select
                    value={formData.studioLocation}
                    onChange={(e) => setFormData({ ...formData, studioLocation: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F2EA] focus:outline-none focus:border-[#C9A24D] tracking-wider cursor-pointer"
                  >
                    <option value="Gulberg Flagship Atelier, Lahore">Gulberg Flagship Atelier, Lahore</option>
                    <option value="Clifton Oceanfront Lounge, Karachi">Clifton Oceanfront Lounge, Karachi</option>
                    <option value="Dubai Design District Suite, UAE">Dubai Design District Suite, UAE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] text-[#C9A24D] uppercase mb-1.5 font-medium">
                    PREFERRED TIME
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full bg-[#161616] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F2EA] focus:outline-none focus:border-[#C9A24D] tracking-wider cursor-pointer"
                  >
                    <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (6:00 PM - 8:30 PM)">Evening (6:00 PM - 8:30 PM)</option>
                  </select>
                </div>
              </div>

              {/* Notes / Special Requests */}
              <div>
                <label className="block text-[10px] tracking-[0.2em] text-[#C9A24D] uppercase mb-1.5 font-medium">
                  SPECIAL REQUIREMENTS / MEASUREMENT NOTES
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details about your upcoming occasion, fabric preferences, or specific silhouette inspirations..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#161616] border border-[#2A2A2A] px-3.5 py-2.5 text-xs text-[#F5F2EA] placeholder-[#555] focus:outline-none focus:border-[#C9A24D] tracking-wider"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="submit-contact-form-btn"
                className="w-full py-3.5 bg-[#C9A24D] text-[#0A0A0A] font-medium text-xs tracking-[0.25em] uppercase hover:bg-[#E0C27A] transition-all shadow-lg cursor-pointer"
              >
                Request Private Fitting Appointment
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Atelier Locations & Concierge Info */}
        <div className="lg:col-span-5 space-y-6">
          {/* Flagship Atelier Card */}
          <div className="bg-[#0E0E0E] border border-[#222] p-6 sm:p-8">
            <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase block mb-2 font-medium">
              FLAGSHIP ATELIER
            </span>
            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F2EA] mb-4">
              Gulberg Heritage Manor, Lahore
            </h3>
            <div className="space-y-3 text-xs text-[#A1A1AA] font-light">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                <span>14-C Sir Syed Road, Gulberg II, Lahore, Pakistan</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-[#C9A24D] shrink-0" />
                <span>+92 (42) 3571-0988 / +92 300 8472911</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-[#C9A24D] shrink-0" />
                <span>concierge@nigahclothes.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                <span>Monday — Saturday: 11:00 AM – 9:00 PM (Private Valet on Premises)</span>
              </div>
            </div>
          </div>

          {/* Karachi & Dubai Suites */}
          <div className="bg-[#0E0E0E] border border-[#222] p-6 sm:p-8">
            <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase block mb-2 font-medium">
              REGIONAL CLIENT SALONS
            </span>
            <div className="space-y-5">
              <div>
                <h4 className="font-serif text-base text-[#F5F2EA]">Karachi Salon</h4>
                <p className="text-xs text-[#888] font-light mt-1">
                  Block 4, Clifton Marine Drive, Karachi. By appointment only.
                </p>
                <p className="text-xs text-[#C9A24D] mt-0.5 font-mono">+92 (21) 3587-4412</p>
              </div>

              <div className="pt-3 border-t border-[#1C1C1C]">
                <h4 className="font-serif text-base text-[#F5F2EA]">Dubai Design District (d3)</h4>
                <p className="text-xs text-[#888] font-light mt-1">
                  Building 7, Suite 402, d3, Dubai, UAE.
                </p>
                <p className="text-xs text-[#C9A24D] mt-0.5 font-mono">+971 4 582 9100</p>
              </div>
            </div>
          </div>

          {/* VIP WhatsApp Concierge Banner */}
          <div className="p-6 bg-[#141E17] border border-[#2E7D32]/50 flex items-center justify-between">
            <div>
              <span className="text-[9px] tracking-[0.25em] text-[#81C784] uppercase block font-medium">
                INSTANT VIP ASSISTANCE
              </span>
              <p className="text-xs text-[#E8F5E9] font-serif mt-1">
                Direct WhatsApp Concierge
              </p>
            </div>
            <a
              href="https://wa.me/+923217655369"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 px-4 bg-[#2E7D32] hover:bg-[#388E3C] text-white text-[10px] tracking-[0.2em] uppercase font-medium transition-colors"
            >
              CHAT NOW
            </a>
          </div>
        </div>
      </div>

      {/* Accordion FAQ Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] text-[#C9A24D] uppercase font-medium block mb-2">
            CLIENT INQUIRIES
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#F5F2EA]">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q}
                className="bg-[#0E0E0E] border border-[#222] transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between space-x-4 cursor-pointer"
                >
                  <span className="font-serif text-base sm:text-lg text-[#F5F2EA] font-normal">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#C9A24D] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#A1A1AA] font-light leading-relaxed border-t border-[#1A1A1A] pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
