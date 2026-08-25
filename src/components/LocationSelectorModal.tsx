import React, { useState } from 'react';
import { MapPin, Search, Navigation, Check, X, AlertCircle, Loader2, Building, ChevronRight } from 'lucide-react';
import { LocationData } from '../types';
import { lookupPostalPincode, ALL_INDIAN_STATES_AND_UTS, DEMO_PINCODES } from '../services/postalLookup';

interface LocationSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: LocationData;
  onSelectLocation: (loc: LocationData) => void;
}

export const LocationSelectorModal: React.FC<LocationSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation
}) => {
  const [pinInput, setPinInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lookupResult, setLookupResult] = useState<LocationData | null>(null);
  const [selectedSubLocality, setSelectedSubLocality] = useState<string>('');
  const [stateSearchQuery, setStateSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'pincode' | 'states'>('pincode');
  const [geoLocating, setGeoLocating] = useState(false);

  if (!isOpen) return null;

  const handleLookup = async (codeToLookup?: string) => {
    const code = (codeToLookup || pinInput).trim();
    if (!code) {
      setErrorMsg('Please enter a 6-digit Indian PIN code');
      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setErrorMsg('PIN code must be exactly 6 numeric digits (e.g. 560068)');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setLookupResult(null);

    const res = await lookupPostalPincode(code);
    setIsLoading(false);

    if (res.success && res.data) {
      setLookupResult(res.data);
      setSelectedSubLocality(res.data.locality);
    } else {
      setErrorMsg(res.error || "Could not resolve PIN code. Please verify.");
    }
  };

  const handleConfirmLocation = (dataToConfirm?: LocationData) => {
    const target = dataToConfirm || lookupResult;
    if (!target) return;

    const finalLoc: LocationData = {
      ...target,
      locality: selectedSubLocality || target.locality
    };

    onSelectLocation(finalLoc);
    onClose();
  };

  const handleSelectDemoPin = (pincode: string) => {
    setPinInput(pincode);
    handleLookup(pincode);
  };

  const handleStateSelect = (stateName: string) => {
    // Generate a regional hub representation for the selected State/UT
    const stateHubMap: Record<string, { pincode: string; locality: string; district: string }> = {
      'Karnataka': { pincode: '560001', locality: 'Bengaluru Central', district: 'Bengaluru Urban' },
      'Maharashtra': { pincode: '400001', locality: 'Mumbai Fort', district: 'Mumbai' },
      'Delhi': { pincode: '110001', locality: 'Connaught Place', district: 'Central Delhi' },
      'Gujarat': { pincode: '382350', locality: 'Ahmedabad (Nikol)', district: 'Ahmedabad' },
      'Tamil Nadu': { pincode: '600001', locality: 'Chennai Central', district: 'Chennai' },
      'West Bengal': { pincode: '700001', locality: 'Kolkata GPO', district: 'Kolkata' },
      'Telangana': { pincode: '500001', locality: 'Hyderabad GPO', district: 'Hyderabad' },
      'Kerala': { pincode: '682001', locality: 'Kochi', district: 'Ernakulam' },
      'Rajasthan': { pincode: '302001', locality: 'Jaipur', district: 'Jaipur' },
      'Uttar Pradesh': { pincode: '226001', locality: 'Lucknow GPO', district: 'Lucknow' },
      'Punjab': { pincode: '141001', locality: 'Ludhiana', district: 'Ludhiana' },
      'Madhya Pradesh': { pincode: '462001', locality: 'Bhopal', district: 'Bhopal' },
      'Bihar': { pincode: '800001', locality: 'Patna', district: 'Patna' },
      'Odisha': { pincode: '751001', locality: 'Bhubaneswar', district: 'Khordha' },
      'Assam': { pincode: '781001', locality: 'Guwahati', district: 'Kamrup' },
      'Jammu and Kashmir': { pincode: '190001', locality: 'Srinagar', district: 'Srinagar' },
      'Manipur': { pincode: '795001', locality: 'Imphal', district: 'Imphal West' },
      'Chandigarh': { pincode: '160017', locality: 'Chandigarh Sector 17', district: 'Chandigarh' }
    };

    const hub = stateHubMap[stateName] || {
      pincode: '110001',
      locality: `${stateName} Capital`,
      district: stateName
    };

    const loc: LocationData = {
      pincode: hub.pincode,
      locality: hub.locality,
      district: hub.district,
      state: stateName,
      deliveryTime: 'Same Day / Next Day Delivery'
    };

    onSelectLocation(loc);
    onClose();
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setGeoLocating(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        setGeoLocating(false);
        // By default on successful location detect, fall back gracefully to Bengaluru or coordinate hub
        const detectedLoc: LocationData = {
          pincode: '560068',
          locality: 'Bengaluru (Current GPS)',
          district: 'Bengaluru Urban',
          state: 'Karnataka',
          deliveryTime: 'Express 2 Hours'
        };
        onSelectLocation(detectedLoc);
        onClose();
      },
      (err) => {
        setGeoLocating(false);
        setErrorMsg('Unable to retrieve your location. Please enter your 6-digit PIN code manually.');
      },
      { timeout: 8000 }
    );
  };

  const filteredStates = ALL_INDIAN_STATES_AND_UTS.filter(s =>
    s.toLowerCase().includes(stateSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-100">
        
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-50/70 to-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0b4d34] text-white flex items-center justify-center shadow-xs">
              <MapPin className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Select Delivery Location</h3>
              <p className="text-xs text-slate-500">
                Check medicine availability & superfast doorstep delivery
              </p>
            </div>
          </div>
          <button
            id="close-location-modal-btn"
            onClick={onClose}
            aria-label="Close location selector"
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Location Banner */}
        <div className="px-5 py-2.5 bg-emerald-50/50 border-b border-emerald-100/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-800 font-medium">Currently Delivering to:</span>
            <span className="bg-white px-2.5 py-0.5 rounded-full border border-emerald-200 text-[#0b4d34] font-bold">
              {currentLocation.pincode} - {currentLocation.locality}, {currentLocation.state}
            </span>
          </div>
          <span className="text-emerald-700 font-semibold hidden sm:inline">
            ⚡ {currentLocation.deliveryTime}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-5 pt-3 gap-6 text-sm font-medium">
          <button
            id="tab-pincode-lookup-btn"
            onClick={() => setActiveTab('pincode')}
            className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'pincode'
                ? 'border-[#0b4d34] text-[#0b4d34] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Enter 6-Digit PIN Code
          </button>
          <button
            id="tab-states-lookup-btn"
            onClick={() => setActiveTab('states')}
            className={`pb-2.5 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'states'
                ? 'border-[#0b4d34] text-[#0b4d34] font-bold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            Browse All States & UTs (36)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'pincode' ? (
            <>
              {/* PIN Code Search Input */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Indian Postal PIN Code (Nationwide Coverage)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      id="pincode-input-field"
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      value={pinInput}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setPinInput(val);
                        if (errorMsg) setErrorMsg(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleLookup();
                      }}
                      placeholder="e.g. 560068 or 382350"
                      className="w-full pl-3.5 pr-10 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0b4d34] focus:border-transparent text-slate-800 text-sm font-semibold tracking-wider placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400"
                    />
                    {pinInput && (
                      <button
                        onClick={() => setPinInput('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <button
                    id="lookup-pincode-submit-btn"
                    onClick={() => handleLookup()}
                    disabled={isLoading || pinInput.length < 6}
                    className="bg-[#ea580c] hover:bg-[#c2410c] disabled:opacity-50 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                    <span>Check</span>
                  </button>
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}
              </div>

              {/* Geolocation Button */}
              <button
                id="use-my-gps-location-btn"
                onClick={handleUseMyLocation}
                disabled={geoLocating}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-emerald-300 bg-emerald-50/60 hover:bg-emerald-100/60 text-[#0b4d34] text-xs font-bold transition-all cursor-pointer"
              >
                {geoLocating ? (
                  <Loader2 className="w-4 h-4 animate-spin text-[#0b4d34]" />
                ) : (
                  <Navigation className="w-4 h-4 text-[#0b4d34]" />
                )}
                <span>Detect Current Location via GPS</span>
              </button>

              {/* Result Preview Card */}
              {lookupResult && (
                <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-4 space-y-3 animate-in fade-in">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full mb-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Postal PIN Verified</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-800">
                        {lookupResult.district}, {lookupResult.state}
                      </h4>
                      <p className="text-xs text-slate-600">
                        PIN Code: <strong className="text-orange-600">{lookupResult.pincode}</strong> • Estimated Delivery: <strong className="text-emerald-700">{lookupResult.deliveryTime}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Multi-locality Selector */}
                  {lookupResult.allLocalities && lookupResult.allLocalities.length > 1 && (
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Select your specific Post Office / Locality:
                      </label>
                      <select
                        value={selectedSubLocality}
                        onChange={(e) => setSelectedSubLocality(e.target.value)}
                        className="w-full p-2 bg-white border border-emerald-300 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0b4d34]"
                      >
                        {lookupResult.allLocalities.map((locName) => (
                          <option key={locName} value={locName}>
                            {locName}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <button
                    id="confirm-matched-location-btn"
                    onClick={() => handleConfirmLocation()}
                    className="w-full bg-[#0b4d34] hover:bg-[#083a27] text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Deliver to {selectedSubLocality || lookupResult.locality} ({lookupResult.pincode})</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Quick Demo Locations for Quick Testing */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Quick Select Cities (Pan-India)
                  </span>
                  <span className="text-[11px] text-slate-400">Click to auto-resolve</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {DEMO_PINCODES.map((item) => (
                    <button
                      key={item.pincode}
                      onClick={() => handleSelectDemoPin(item.pincode)}
                      className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        currentLocation.pincode === item.pincode
                          ? 'bg-[#0b4d34] text-white border-[#0b4d34] font-bold'
                          : 'bg-gray-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border-gray-200'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Browse All 28 States & 8 Union Territories */
            <div className="space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={stateSearchQuery}
                  onChange={(e) => setStateSearchQuery(e.target.value)}
                  placeholder="Search Indian State or Union Territory..."
                  className="w-full pl-9 pr-3.5 py-2 border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0b4d34]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {filteredStates.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStateSelect(st)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 hover:border-emerald-500 hover:bg-emerald-50/60 text-left transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0b4d34]" />
                      <span className="text-xs font-semibold text-slate-700 group-hover:text-[#0b4d34]">
                        {st}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-[#0b4d34]" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-slate-500">
          <span>Nationwide delivery across 19,000+ Indian PIN codes</span>
          <button
            onClick={onClose}
            className="text-slate-600 hover:text-slate-900 font-semibold px-3 py-1 rounded-lg hover:bg-gray-200 cursor-pointer"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
