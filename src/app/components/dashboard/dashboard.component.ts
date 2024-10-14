import {Component, OnInit} from '@angular/core'
import {BehaviorSubject} from 'rxjs'
import {WeatherService} from '../../services/weather.service'
import {FormsModule} from '@angular/forms'
import {WeatherCardComponent} from '../weather-card/weather-card.component'
import {AsyncPipe, NgFor, NgIf, NgOptimizedImage} from '@angular/common'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    FormsModule,
    WeatherCardComponent,
    NgIf,
    AsyncPipe,
    NgFor,
    NgOptimizedImage
  ],
  standalone: true
})
export class DashboardComponent implements OnInit {
  cityInput: string = ''
  citiesWeather: any[] = []
  isLoading = new BehaviorSubject<boolean>(false)
  error = ''
  icon = '/assets/Gear.gif'

  constructor(private weatherService: WeatherService) {
  }

  ngOnInit(): void {
    const savedCities = localStorage.getItem('cities')
    if (savedCities) {
      const cities = JSON.parse(savedCities)
      cities.forEach((cityData: any) => {
        this.fetchCityWeather(cityData.city)
      })
    }
  }

  fetchCityWeather(city: string): void {
    this.isLoading.next(true)
    this.weatherService.getWeather(city).subscribe({
      next: (data) => {
        this.citiesWeather.push(data)
        this.updateLocalStorage()
        this.error = ''
      },
      error: (err) => {
        this.error = 'City not found'
      },
      complete: () => this.isLoading.next(false),
    })
  }

  addCity() {
    this.fetchCityWeather(this.cityInput)
    this.cityInput = ''
    localStorage.setItem('cities', JSON.stringify(this.citiesWeather))
  }

  removeCity(index: number) {
    this.citiesWeather.splice(index, 1)
    localStorage.setItem('cities', JSON.stringify(this.citiesWeather))
  }
    updateLocalStorage() {
    localStorage.setItem('cities', JSON.stringify(this.citiesWeather))
  }
}
