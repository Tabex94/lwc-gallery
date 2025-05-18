import { LightningElement, wire } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherAppController.getWeatherData';

export default class weatherApp extends LightningElement {

    @wire(getWeatherData) weatherData;
    weatherDatex;
    get temperature() {
        return this.weatherData.data;
    }

    get isObject(){
        return typeof this.weatherData === "object";;
    }

    get something(){
        try {
            //console.log('weatherData:', this.weatherData);
            console.log('Full weatherData:', this.weatherData); // First check the complete object
        
            // If using @wire, the data is in this.weatherData.data (if successful)
            const rawData = this.weatherData?.data || this.weatherData;
            
            // Check if we need to parse (only if it's a string)
            const parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            
            console.log('Parsed weatherData:', parsedData); // Proper object inspection
            console.log('Temperature:', parsedData?.current?.temperature_2m); // Specific property
            
            return parsedData?.current?.temperature_2m || 'Data not available';

        }
        catch (error) {
            return 'error occurred';
        }
    }

}