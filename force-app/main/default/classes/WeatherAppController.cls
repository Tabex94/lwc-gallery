public with sharing class WeatherAppController {
    
    @AuraEnabled(cacheable=true)
    public static String getWeatherData(){
        
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Open_Meteo_API/v1/forecast?latitude=17.7&longitude=-92.8&current=temperature_2m');
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);
        System.debug(res.getBody());
        
        return res.getBody();
    }
    
    public static void testApi(){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('callout:Open_Meteo_API/v1/forecast?latitude=17.7&longitude=-92.8&current=temperature_2m');
        req.setMethod('GET');
        HttpResponse res = new Http().send(req);
        System.debug(res.getBody());
    }
}