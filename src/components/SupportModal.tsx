import React, { useState } from 'react';
import { 
  X, 
  Headphones, 
  Phone, 
  Mail, 
  HelpCircle, 
  Package, 
  FileText, 
  Truck, 
  RotateCcw, 
  MessageSquare,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SupportTab = 'all' | 'order' | 'prescription' | 'delivery' | 'returns' | 'contact';

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<SupportTab>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  
  // Contact Support Form State
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    issueType: 'Order Inquiry',
    message: ''
  });
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      category: 'order',
      categoryLabel: 'Order Help',
      question: 'How do I place an order for medicines on MediCare+?',
      answer: 'Search for your medicine using the search bar, select the required pack size, upload a prescription if prompted for Rx drugs, and proceed to checkout with your delivery address.'
    },
    {
      category: 'prescription',
      categoryLabel: 'Prescription Help',
      question: 'What kind of prescriptions are accepted?',
      answer: 'We accept clear photos or PDFs of valid physical or digital doctor prescriptions. The prescription must clearly show the doctor’s name, registration number, patient name, date, and dosage details.'
    },
    {
      category: 'delivery',
      categoryLabel: 'Delivery Help',
      question: 'How fast is express medicine delivery?',
      answer: 'In covered metropolitan areas (like Bengaluru), express delivery arrives within 2 hours. Standard nationwide delivery takes 24 to 48 hours with temperature-controlled packaging.'
    },
    {
      category: 'returns',
      categoryLabel: 'Returns & Refunds',
      question: 'What is your return and cancellation policy?',
      answer: 'Unopened health devices and OTC products can be returned within 7 days. Medicines damaged in transit or dispensed incorrectly are eligible for an immediate replacement or full refund.'
    },
    {
      category: 'order',
      categoryLabel: 'Order Help',
      question: 'Can I reorder my regular monthly chronic medications?',
      answer: 'Yes! Navigate to your order history and click "Reorder" to quickly reload all monthly prescriptions into your cart with 1-click discount auto-application.'
    },
    {
      category: 'prescription',
      categoryLabel: 'Prescription Help',
      question: 'What if I do not have a prescription?',
      answer: 'You can request a free teleconsultation with our registered panel doctors by clicking "Consult a Doctor" or during the prescription upload step.'
    }
  ];

  const filteredFaqs = activeTab === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeTab);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.emailOrPhone && formData.message) {
      setTicketSubmitted(true);
      setTimeout(() => {
        setTicketSubmitted(false);
        setFormData({ name: '', emailOrPhone: '', issueType: 'Order Inquiry', message: '' });
      }, 5000);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-gray-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="support-modal-title"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b4d34] text-white flex items-center justify-center shadow-xs">
              <Headphones className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 id="support-modal-title" className="font-extrabold text-slate-800 text-lg">
                Help & Customer Support
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                24/7 dedicated assistance for all your pharmacy needs
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href="tel:+918471009009"
              className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/70 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#0b4d34] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-600">24/7 Toll-Free Call</div>
                <div className="font-mono font-bold text-[#0b4d34] text-sm truncate">+91 847 100 9009</div>
                <div className="text-[10px] text-slate-500">Pharmacist on line</div>
              </div>
            </a>

            <a
              href="mailto:care@medicare.com"
              className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200 hover:bg-orange-100/70 transition-all flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-[#ea580c] text-white flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-slate-600">Email Helpdesk</div>
                <div className="font-bold text-[#ea580c] text-sm truncate">care@medicare.com</div>
                <div className="text-[10px] text-slate-500">Response in ~15 mins</div>
              </div>
            </a>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs border-b border-gray-100">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#0b4d34] text-white'
                  : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              All Topics
            </button>
            <button
              onClick={() => setActiveTab('order')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                activeTab === 'order'
                  ? 'bg-[#0b4d34] text-white'
                  : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Order Help</span>
            </button>
            <button
              onClick={() => setActiveTab('prescription')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                activeTab === 'prescription'
                  ? 'bg-[#0b4d34] text-white'
                  : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Prescription Help</span>
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                activeTab === 'delivery'
                  ? 'bg-[#0b4d34] text-white'
                  : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Delivery Help</span>
            </button>
            <button
              onClick={() => setActiveTab('returns')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                activeTab === 'returns'
                  ? 'bg-[#0b4d34] text-white'
                  : 'text-slate-600 hover:bg-gray-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Returns & Refunds</span>
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1 cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-[#ea580c] text-white'
                  : 'text-[#ea580c] hover:bg-orange-50'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Support</span>
            </button>
          </div>

          {/* Tab Content: FAQ view or Contact Support Form */}
          {activeTab !== 'contact' ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-[#0b4d34]" />
                  <span>Frequently Asked Questions</span>
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">
                  {filteredFaqs.length} answers
                </span>
              </div>

              <div className="space-y-2">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="border border-gray-200 rounded-2xl overflow-hidden bg-white hover:border-emerald-200 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-3.5 text-left flex items-center justify-between gap-2 hover:bg-slate-50/70 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800">
                            {faq.categoryLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-800">
                            {faq.question}
                          </span>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 border-t border-gray-100 bg-slate-50/50 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('contact')}
                  className="text-xs font-bold text-[#0b4d34] hover:text-[#083a27] underline cursor-pointer"
                >
                  Can't find what you're looking for? Send us a direct message &rarr;
                </button>
              </div>
            </div>
          ) : (
            /* Contact Support Form */
            <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#ea580c]" />
                <span>Submit a Support Request</span>
              </h4>

              {ticketSubmitted ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 animate-in fade-in">
                  <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                  <h5 className="text-sm font-bold text-slate-800">Ticket #MED-{(Math.random() * 90000 + 10000).toFixed(0)} Created</h5>
                  <p className="text-xs text-slate-600">
                    Thank you! Our pharmacy support team will contact you at <strong>{formData.emailOrPhone}</strong> within 15 minutes.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitTicket} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0b4d34] bg-white outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Email or Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.emailOrPhone}
                        onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                        placeholder="e.g. rahul@example.com / 9876543210"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0b4d34] bg-white outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Issue Category
                    </label>
                    <select
                      value={formData.issueType}
                      onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0b4d34] bg-white outline-hidden cursor-pointer"
                    >
                      <option value="Order Inquiry">Order Help & Tracking</option>
                      <option value="Prescription Consultation">Prescription Verification / Doctor Call</option>
                      <option value="Delivery Issue">Delivery Delay or PIN Code Inquiry</option>
                      <option value="Return / Refund">Returns, Replacements & Refunds</option>
                      <option value="Pharmacist Consultation">Speak to Licensed Pharmacist</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-700 block mb-1">
                      Message / Question <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please describe how we can assist you..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0b4d34] bg-white outline-hidden resize-none"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('all')}
                      className="text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer"
                    >
                      &larr; Back to FAQs
                    </button>

                    <button
                      type="submit"
                      className="bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
