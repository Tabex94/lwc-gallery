import { LightningElement, wire } from 'lwc';
import getWeatherData from '@salesforce/apex/WeatherAppController.getWeatherData';



export default class weatherApp extends LightningElement {
    parsedWeather=null;//Empty object to store parsed weather data
    message='';
    tempReady=false;
    messagesBlock=['Is too cold','is too normal','too hot'];
    
    /*getTemperatureMsg(temperature) {
    for (const range of weatherApp.temperatureMessages) {
        if (temperature >= range.min && temperature <= range.max) {
            return range.message;
        }
    }
    return "Enjoy the weather!";
    }*/

    @wire(getWeatherData) wiredWeather({ error, data }) {
        if (data) {
            this.wiredWeather = data;
            console.log('Weather Data:', this.wiredWeather);
            const rawData = this.wiredWeather?.data || this.wiredWeather;
            this.parsedWeather = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            console.log('Parsed weatherData:', this.parsedWeather); // Proper object inspection
            console.log('Temperature:', this.parsedWeather?.current?.temperature_2m);
            this.tempReady=true;

        } else if (error) {
            
            console.error('Error:');
        }
    }

    get rawTemperature(){
        try{
            return this.parsedWeather?.current?.temperature_2m; //Raw temperature
        }catch (error) {
            return 'Loading...';
        }
    }

    get rawWeatherData(){
        try{
            return this.wiredWeather; //Raw weather data
        }catch (error) {
            return 'Loading...';
        }
    }
    get welcomeMessage() { 
        if(this.tempReady && this.parsedWeather.current.temperature_2m){
            try{
                this.message=this.messagesBlock[1];
                if(this.parsedWeather.current.temperature_2m<20){
                    this.message=this.messagesBlock[0];
                }else if(this.parsedWeather.current.temperature_2m>35){
                    this.message=this.messagesBlock[2];
                }
                return this.message; //Message
            }catch (error) {
                return 'error';
        }
        }else{
            return 'Loading...';
        }
    }

    
}


    /*
    getTemperatureMessage(temperature) {
    for (const range of temperatureMessages) {
        if (temperature >= range.min && temperature <= range.max) {
            return range.message;
        }
    }
    return "Enjoy the weather!";

    parsedData=null;
    get isObject(){
        return typeof this.weatherData === "object";;
    }

    get something(){
        try {
            //console.log('weatherData:', this.weatherData);
            console.log('Full weatherData:', this.weatherData); // First check the complete object
        
            const rawData = this.weatherData?.data || this.weatherData;
            this.parsedData = typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
            
            console.log('Parsed weatherData:', this.parsedData); // Proper object inspection
            console.log('Temperature:', this.parsedData?.current?.temperature_2m); // Specific property
            
            return this.parsedData?.current?.temperature_2m || 'Data not available';

        }
        catch (error) {
            return 'error occurred';
        }
    }

    */
