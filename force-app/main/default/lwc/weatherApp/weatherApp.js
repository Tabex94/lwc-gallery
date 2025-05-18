import { LightningElement, wire } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherAppController.getWeatherData';

export default class weatherApp extends LightningElement {
    @wire(getWeatherData) weatherData;
    weatherData;
    
    get temperature() {
        return this.weatherData.data ? this.weatherData.data.temperature : 'Loading...';
    }

}