import {Component, Input, Output, EventEmitter} from '@angular/core'
import {WeatherService} from '../../services/weather.service';
import {CommonModule} from '@angular/common';
import {trigger, state, style, animate, transition} from '@angular/animations'

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('toggleForecast', [
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
          padding: '16px 0'
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          padding: '0px'
        })
      ),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})
export class WeatherCardComponent {
  @Input() city: any
  @Output() remove = new EventEmitter<void>()
  forecast: any[] = []
  showForecast: boolean = false
  isForecastLoading: boolean = false

  constructor(private weatherService: WeatherService) {
  }

  error: string = ''

  removeCity() {
    this.remove.emit()
  }

  toggleForecast() {
    if (this.showForecast) {
      this.showForecast = false
    } else {
      this.isForecastLoading = true
      this.weatherService.getForecast(this.city.city).subscribe({
        next: (data) => {
          this.forecast = data
          this.showForecast = true
          this.error = ''
        },
        error: (err) => {
          this.error = 'Unable to load forecast'
        },
        complete: () => {
          this.isForecastLoading = false
        }
      })
    }
  }
}
