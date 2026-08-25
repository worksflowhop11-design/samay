import { LocationData } from '../types';

export interface PostalResponseItem {
  Message: string;
  Status: 'Success' | 'Error';
  PostOffice: Array<{
    Name: string;
    District: string;
    State: string;
    Pincode: string;
    Circle?: string;
    Block?: string;
    BranchType?: string;
  }> | null;
}

// Fallback high-speed cache / offline dictionary of representative PIN codes across all zones & UTs of India
const KNOWN_PINCODES: Record<string, { locality: string; district: string; state: string; deliveryTime: string; allLocalities: string[] }> = {
  // South
  '560068': { locality: 'Bengaluru (Electronic City)', district: 'Bengaluru Urban', state: 'Karnataka', deliveryTime: 'Express 2 Hours', allLocalities: ['Electronic City', 'Bommanahalli', 'Begur', 'Singasandra'] },
  '560001': { locality: 'Bengaluru (MG Road)', district: 'Bengaluru Urban', state: 'Karnataka', deliveryTime: 'Express 2 Hours', allLocalities: ['MG Road', 'Brigade Road', 'Ashok Nagar'] },
  '600001': { locality: 'Chennai (George Town)', district: 'Chennai', state: 'Tamil Nadu', deliveryTime: 'Express 2 Hours', allLocalities: ['George Town', 'Parrys', 'Mannady'] },
  '682001': { locality: 'Kochi (Ernakulam)', district: 'Ernakulam', state: 'Kerala', deliveryTime: 'Express 3 Hours', allLocalities: ['Ernakulam Head Post Office', 'Marine Drive'] },
  '500001': { locality: 'Hyderabad (Abids)', district: 'Hyderabad', state: 'Telangana', deliveryTime: 'Express 2 Hours', allLocalities: ['Abids', 'Koti', 'Nampally'] },
  
  // West
  '382350': { locality: 'Ahmedabad (Nikol)', district: 'Ahmedabad', state: 'Gujarat', deliveryTime: 'Express 2 Hours', allLocalities: ['Nikol', 'Naroda', 'Bapunagar', 'Odhav'] },
  '380001': { locality: 'Ahmedabad (Khadia)', district: 'Ahmedabad', state: 'Gujarat', deliveryTime: 'Express 2 Hours', allLocalities: ['Khadia', 'Kalupur', 'Manek Chowk'] },
  '400001': { locality: 'Mumbai (Fort)', district: 'Mumbai', state: 'Maharashtra', deliveryTime: 'Express 90 Mins', allLocalities: ['Fort', 'Ballard Estate', 'Fountain'] },
  '411001': { locality: 'Pune (Camp)', district: 'Pune', state: 'Maharashtra', deliveryTime: 'Express 2 Hours', allLocalities: ['Pune Camp', 'Cantonment', 'Dhole Patil Road'] },
  '302001': { locality: 'Jaipur (City)', district: 'Jaipur', state: 'Rajasthan', deliveryTime: 'Same Day Delivery', allLocalities: ['Jaipur G.P.O.', 'M.I. Road', 'Johari Bazar'] },
  
  // North
  '110001': { locality: 'New Delhi (Connaught Place)', district: 'Central Delhi', state: 'Delhi', deliveryTime: 'Express 90 Mins', allLocalities: ['Connaught Place', 'Barakhamba Road', 'Janpath'] },
  '141001': { locality: 'Ludhiana (Civil Lines)', district: 'Ludhiana', state: 'Punjab', deliveryTime: 'Same Day Delivery', allLocalities: ['Civil Lines', 'Clock Tower', 'Ferozepur Road'] },
  '190001': { locality: 'Srinagar (Lal Chowk)', district: 'Srinagar', state: 'Jammu and Kashmir', deliveryTime: 'Next Day Delivery', allLocalities: ['Lal Chowk', 'Karan Nagar', 'Residency Road'] },
  '208001': { locality: 'Kanpur (Mall Road)', district: 'Kanpur Nagar', state: 'Uttar Pradesh', deliveryTime: 'Same Day Delivery', allLocalities: ['Mall Road', 'Civil Lines', 'Naveen Market'] },
  '248001': { locality: 'Dehradun (Rajpur Road)', district: 'Dehradun', state: 'Uttarakhand', deliveryTime: 'Same Day Delivery', allLocalities: ['Rajpur Road', 'Clock Tower', 'Paltan Bazar'] },
  '171001': { locality: 'Shimla (Mall)', district: 'Shimla', state: 'Himachal Pradesh', deliveryTime: 'Next Day Delivery', allLocalities: ['The Mall', 'Ridge', 'Chotta Shimla'] },
  
  // East
  '700001': { locality: 'Kolkata (BBD Bagh)', district: 'Kolkata', state: 'West Bengal', deliveryTime: 'Express 2 Hours', allLocalities: ['BBD Bagh', 'Dalhousie', 'Esplanade'] },
  '751001': { locality: 'Bhubaneswar (Old Town)', district: 'Khordha', state: 'Odisha', deliveryTime: 'Same Day Delivery', allLocalities: ['Old Town', 'Master Canteen', 'Saheed Nagar'] },
  '800001': { locality: 'Patna (GPO)', district: 'Patna', state: 'Bihar', deliveryTime: 'Same Day Delivery', allLocalities: ['Patna GPO', 'Frazer Road', 'Kankarbagh'] },
  '834001': { locality: 'Ranchi (Main Road)', district: 'Ranchi', state: 'Jharkhand', deliveryTime: 'Same Day Delivery', allLocalities: ['Main Road', 'Doranda', 'Lalpur'] },
  
  // Central
  '462001': { locality: 'Bhopal (City)', district: 'Bhopal', state: 'Madhya Pradesh', deliveryTime: 'Same Day Delivery', allLocalities: ['Bhopal GPO', 'MP Nagar', 'Arera Colony'] },
  '492001': { locality: 'Raipur (City)', district: 'Raipur', state: 'Chhattisgarh', deliveryTime: 'Same Day Delivery', allLocalities: ['Raipur GPO', 'Pandri', 'Civil Lines'] },
  
  // North East
  '781001': { locality: 'Guwahati (Pan Bazar)', district: 'Kamrup', state: 'Assam', deliveryTime: 'Next Day Delivery', allLocalities: ['Pan Bazar', 'Paltan Bazar', 'Fancy Bazar'] },
  '795001': { locality: 'Imphal (City)', district: 'Imphal West', state: 'Manipur', deliveryTime: 'Standard 2 Days', allLocalities: ['Imphal Head Office', 'Paona Bazar', 'Thangal Bazar'] },
  '799001': { locality: 'Agartala (City)', district: 'West Tripura', state: 'Tripura', deliveryTime: 'Standard 2 Days', allLocalities: ['Agartala H.O.', 'Melarmath'] },
  '793001': { locality: 'Shillong (Police Bazar)', district: 'East Khasi Hills', state: 'Meghalaya', deliveryTime: 'Standard 2 Days', allLocalities: ['Police Bazar', 'Laban', 'Laitumkhrah'] },
  '797001': { locality: 'Kohima (City)', district: 'Kohima', state: 'Nagaland', deliveryTime: 'Standard 2 Days', allLocalities: ['Kohima H.O.'] },
  '796001': { locality: 'Aizawl (City)', district: 'Aizawl', state: 'Mizoram', deliveryTime: 'Standard 2 Days', allLocalities: ['Aizawl H.O.'] },
  '791111': { locality: 'Itanagar (City)', district: 'Papum Pare', state: 'Arunachal Pradesh', deliveryTime: 'Standard 2 Days', allLocalities: ['Itanagar H.O.'] },
  '737101': { locality: 'Gangtok (MG Marg)', district: 'East Sikkim', state: 'Sikkim', deliveryTime: 'Standard 2 Days', allLocalities: ['Gangtok H.O.'] },
  
  // Union Territories
  '160017': { locality: 'Chandigarh (Sector 17)', district: 'Chandigarh', state: 'Chandigarh', deliveryTime: 'Express 2 Hours', allLocalities: ['Sector 17', 'Sector 22', 'Sector 35'] },
  '605001': { locality: 'Puducherry (White Town)', district: 'Pondicherry', state: 'Puducherry', deliveryTime: 'Same Day Delivery', allLocalities: ['White Town', 'Heritage Town', 'MG Road'] },
  '744101': { locality: 'Port Blair (City)', district: 'South Andaman', state: 'Andaman and Nicobar Islands', deliveryTime: 'Standard 3 Days', allLocalities: ['Port Blair H.O.', 'Aberdeen Bazar'] },
  '403001': { locality: 'Panaji (City)', district: 'North Goa', state: 'Goa', deliveryTime: 'Same Day Delivery', allLocalities: ['Panaji H.O.', 'Fontainhas', 'Miramar'] },
  '194101': { locality: 'Leh (City)', district: 'Leh Ladakh', state: 'Ladakh', deliveryTime: 'Standard 3 Days', allLocalities: ['Leh H.O.'] }
};

export const ALL_INDIAN_STATES_AND_UTS = [
  // 28 States
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala',
  'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland',
  'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // 8 Union Territories
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

export const DEMO_PINCODES = [
  { pincode: '560068', label: 'Bengaluru (560068)', state: 'Karnataka', region: 'South' },
  { pincode: '382350', label: 'Ahmedabad (382350)', state: 'Gujarat', region: 'West' },
  { pincode: '110001', label: 'New Delhi (110001)', state: 'Delhi', region: 'North' },
  { pincode: '400001', label: 'Mumbai (400001)', state: 'Maharashtra', region: 'West' },
  { pincode: '700001', label: 'Kolkata (700001)', state: 'West Bengal', region: 'East' },
  { pincode: '600001', label: 'Chennai (600001)', state: 'Tamil Nadu', region: 'South' },
  { pincode: '795001', label: 'Imphal (795001)', state: 'Manipur', region: 'North East' },
  { pincode: '190001', label: 'Srinagar (190001)', state: 'J&K', region: 'North' },
  { pincode: '160017', label: 'Chandigarh (160017)', state: 'Chandigarh', region: 'UT' }
];

export const DEFAULT_LOCATION: LocationData = {
  pincode: '560068',
  locality: 'Bengaluru',
  district: 'Bengaluru Urban',
  state: 'Karnataka',
  deliveryTime: 'Express 2 Hours',
  allLocalities: ['Electronic City', 'Bommanahalli', 'Begur', 'Singasandra']
};

/**
 * Live Postal PIN Code Lookup using India Post API with robust fallback.
 * Strictly adheres to full 6-digit Indian Postal specifications across 28 states & 8 UTs.
 */
export async function lookupPostalPincode(pincode: string): Promise<{ success: boolean; data?: LocationData; error?: string }> {
  const cleanPin = pincode.trim();

  // Validate 6 digits
  if (!/^\d{6}$/.test(cleanPin)) {
    return {
      success: false,
      error: 'Please enter a valid 6-digit Indian PIN code (e.g. 560068 or 382350).'
    };
  }

  // Fast offline cache check first if available for instant feel
  if (KNOWN_PINCODES[cleanPin]) {
    const cached = KNOWN_PINCODES[cleanPin];
    return {
      success: true,
      data: {
        pincode: cleanPin,
        locality: cached.locality.split(' (')[0],
        district: cached.district,
        state: cached.state,
        deliveryTime: cached.deliveryTime,
        allLocalities: cached.allLocalities
      }
    };
  }

  // Live query to Postal API
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Postal API responded with status ${response.status}`);
    }

    const json: PostalResponseItem[] = await response.json();

    if (json && json.length > 0 && json[0].Status === 'Success' && json[0].PostOffice && json[0].PostOffice.length > 0) {
      const offices = json[0].PostOffice;
      const primaryOffice = offices[0];
      const localitiesList = Array.from(new Set(offices.map(o => o.Name)));
      
      const district = primaryOffice.District || primaryOffice.Circle || 'District Area';
      const state = primaryOffice.State || 'India';
      
      // Determine delivery time speed dynamically based on metro/hub status
      const isMetro = ['Delhi', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Telangana', 'West Bengal', 'Gujarat'].includes(state);
      const deliveryTime = isMetro ? 'Express 2-4 Hours' : 'Next Day Delivery';

      const resultData: LocationData = {
        pincode: cleanPin,
        locality: primaryOffice.Name,
        district: district,
        state: state,
        deliveryTime: deliveryTime,
        allLocalities: localitiesList
      };

      return {
        success: true,
        data: resultData
      };
    } else {
      return {
        success: false,
        error: "We couldn't find this PIN code in India Post database. Please verify and try again."
      };
    }
  } catch (err: unknown) {
    console.warn('Live postal API lookup failed, checking fallback:', err);
    // If live API had network/CORS failure, provide clear guidance or closest match
    return {
      success: false,
      error: 'Location service is momentarily unreachable. Please pick a state or try another PIN code.'
    };
  }
}
