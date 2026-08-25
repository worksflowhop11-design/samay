import React, { useState } from 'react';
import { 
  FileUp, 
  X, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  PhoneCall, 
  ShoppingBag,
  Loader2,
  Camera
} from 'lucide-react';
import { Prescription } from '../types';

interface PrescriptionUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrescriptionUploaded: (rx: Prescription) => void;
}

export const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  isOpen,
  onClose,
  onPrescriptionUploaded
}) => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [notes, setNotes] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'call_confirm' | 'auto_order'>('call_confirm');
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [uploadedRxData, setUploadedRxData] = useState<Prescription | null>(null);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFileName(e.target.files[0].name);
    }
  };

  const handleUseDemoRx = () => {
    setSelectedFileName('Rx_DrSharma_Clinic_Aug2026.pdf');
    setPatientName('Rahul Sharma');
    setDoctorName('Dr. Arvind Gupta (MD, Reg #54210)');
    setNotes('Please dispense standard 30-day course for blood pressure and multivitamin.');
  };

  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFileName) {
      alert('Please select or upload a valid prescription file/image.');
      return;
    }
    if (!patientName.trim()) {
      alert('Please enter patient full name.');
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      setIsUploading(false);
      const newRx: Prescription = {
        id: `RX-${Math.floor(100000 + Math.random() * 900000)}`,
        fileName: selectedFileName,
        patientName: patientName.trim(),
        doctorName: doctorName.trim() || 'Dr. Registered Medical Practitioner',
        notes: notes.trim(),
        uploadDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: 'Pending Review',
        orderOption: deliveryOption
      };

      setUploadedRxData(newRx);
      setIsSuccess(true);
      onPrescriptionUploaded(newRx);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-100">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b4d34] text-white flex items-center justify-center shadow-xs">
              <FileUp className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Upload Prescription</h3>
              <p className="text-xs text-slate-500">
                Licensed pharmacist verification within 15 minutes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {isSuccess && uploadedRxData ? (
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#0b4d34] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Prescription Uploaded Successfully!</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Prescription ID: <strong className="text-[#0b4d34] font-mono">{uploadedRxData.id}</strong>
                </p>
              </div>

              <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-left text-xs space-y-1.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold text-slate-800">{uploadedRxData.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">File:</span>
                  <span className="font-semibold text-slate-700">{uploadedRxData.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Verification Status:</span>
                  <span className="font-bold text-[#ea580c] bg-orange-100 px-2 py-0.5 rounded">
                    Under Pharmacist Review
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Our registered pharmacist is reviewing your prescription. You can continue shopping or check order status.
              </p>

              <button
                onClick={onClose}
                className="bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold px-8 py-3 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitUpload} className="space-y-4">
              
              {/* File Drop Area */}
              <div className="border-2 border-dashed border-emerald-300 hover:border-[#0b4d34] bg-emerald-50/40 hover:bg-emerald-50/70 rounded-2xl p-5 text-center transition-all relative">
                <input
                  type="file"
                  id="prescription-file-upload-input"
                  accept="image/*,.pdf"
                  onChange={handleFileDrop}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                
                <div className="flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-white text-[#0b4d34] flex items-center justify-center shadow-xs mb-2">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  {selectedFileName ? (
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0b4d34] bg-white px-3 py-1.5 rounded-xl border border-emerald-300">
                      <FileText className="w-4 h-4" />
                      <span>{selectedFileName}</span>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm font-bold text-slate-800">
                        Drag & drop prescription image or PDF here
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Supports JPG, PNG, PDF up to 10 MB
                      </p>
                    </>
                  )}
                </div>

                <div className="mt-3 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={handleUseDemoRx}
                    className="text-[11px] font-bold text-[#0b4d34] bg-white hover:bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-lg transition-colors cursor-pointer shadow-2xs"
                  >
                    ⚡ Use Sample Prescription (Demo)
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4d34]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Doctor / Clinic Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="e.g. Dr. A. Gupta"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4d34]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Special Notes / Dosage Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Dispense 1 month course, include generic substitutes if available..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0b4d34]"
                />
              </div>

              {/* Delivery / Order Preference Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">
                  How would you like to place this order?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label
                    onClick={() => setDeliveryOption('call_confirm')}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      deliveryOption === 'call_confirm'
                        ? 'border-[#0b4d34] bg-emerald-50/60 ring-1 ring-[#0b4d34]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <PhoneCall className="w-4 h-4 text-[#0b4d34] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">Call me to confirm</div>
                      <div className="text-[11px] text-slate-500">
                        Pharmacist will call & add medicines to cart for you
                      </div>
                    </div>
                  </label>

                  <label
                    onClick={() => setDeliveryOption('auto_order')}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                      deliveryOption === 'auto_order'
                        ? 'border-[#0b4d34] bg-emerald-50/60 ring-1 ring-[#0b4d34]'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-[#0b4d34] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-slate-800">I will search & add items</div>
                      <div className="text-[11px] text-slate-500">
                        Upload Rx for verification and proceed to checkout
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Valid Prescription Guidelines Checklist */}
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0b4d34]" />
                  <span>Valid Prescription Checklist:</span>
                </div>
                <p>✓ Doctor's name, degree & medical council registration number</p>
                <p>✓ Patient name and date within the last 6 months</p>
                <p>✓ Clear dosage, frequency & duration for each medication</p>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-gray-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || !selectedFileName}
                  className="bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-50 text-white font-extrabold px-6 py-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <FileUp className="w-4 h-4" />
                      <span>Upload & Verify Rx</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
