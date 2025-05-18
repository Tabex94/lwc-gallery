import { LightningElement, wire } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherAppController.getWeatherData';

export default class weatherApp extends LightningElement {

    formatedData='';
    @wire(getWeatherData) weatherData;

    /*@wire(getWeatherData) weatherData({ error, data }){
        if(data){
            
            console.log('Weather data:', data);
            try {
                this.formatedData = typeof data === 'string' ? JSON.parse(data) : data;
                console.log('Formatted Weather data:', this.formatedData);
                } catch(parseError) {
                    console.error('Error parsing weather data:', parseError);
                }
            
        } else if(error){
            console.error('Error fetching weather data:', error);
        }
    }*/

    //weatherDataObje = this.weatherData.data;
    
    get temperature() {
        return this.weatherData.data;
    }

    get isDay(){
        return this.weatherData.data;
    }

}