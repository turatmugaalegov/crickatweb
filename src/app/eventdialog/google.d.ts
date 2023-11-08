declare namespace google.maps {
    class Geocoder {
      geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
    }
  
    interface GeocoderRequest {
      address: string;
    }
  
    interface GeocoderResult {
      geometry: {
        location: LatLng;
      };
    }
  
    interface LatLng {
      lat(): number;
      lng(): number;
    }
  
    type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';
  }