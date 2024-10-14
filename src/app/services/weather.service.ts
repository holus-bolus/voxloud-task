import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {catchError, Observable, throwError} from 'rxjs'
import {map} from 'rxjs/operators'
import { environment } from '../../environments/environments'
interface WeatherResponse {
  name: string
  main: {
    temp: number
  }
  weather: {
    description: string
  }[]
}

interface ForecastResponse {
  list: {
    dt_txt: string
    main: {
      temp: number
    }
    weather: {
      description: string
    }[]
  }[]
}


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = environment.openWeatherApiKey
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather'
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'

  constructor(private http: HttpClient) {
  }

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    return this.http.get<WeatherResponse>(url).pipe(
      map(response => ({
        city: response.name,
        temp: response.main.temp,
        condition: response.weather[0].description,
      })),
      catchError(error => throwError(() => new Error('City not found')))
    )
  }

  getForecast(city: string): Observable<any> {
    const url = `${this.forecastUrl}?q=${city}&appid=${this.apiKey}&units=metric`
    return this.http.get<ForecastResponse>(url).pipe(
      map(response => {
        const dailyForecasts = response.list.filter(item => item.dt_txt.includes('12:00:00'))
        return dailyForecasts.map(item => ({
          date: item.dt_txt.split(' ')[0],
          temp: item.main.temp,
          condition: item.weather[0].description
        }))
      }),
      catchError(error => throwError(() => new Error('Forecast not found')))
    )
  }
}
