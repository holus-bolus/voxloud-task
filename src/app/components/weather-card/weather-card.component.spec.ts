import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherCardComponent } from './weather-card.component';
import { WeatherService } from '../../services/weather.service';
import { of, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;
  let mockWeatherService: jasmine.SpyObj<WeatherService>;

  beforeEach(async () => {
    mockWeatherService = jasmine.createSpyObj('WeatherService', ['getForecast']);

    await TestBed.configureTestingModule({
      imports: [WeatherCardComponent, HttpClientModule, BrowserAnimationsModule],
      providers: [{ provide: WeatherService, useValue: mockWeatherService }],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    component.city = { city: 'Test City', temp: 25, condition: 'Sunny' };
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the remove event when removeCity() is called', () => {
    spyOn(component.remove, 'emit');
    component.removeCity();
    expect(component.remove.emit).toHaveBeenCalled();
  });

  it('should toggle the forecast on button click', () => {
    const forecastData = [
      { date: '2024-10-15', temp: 20, condition: 'Clear' },
      { date: '2024-10-16', temp: 22, condition: 'Cloudy' },
    ];
    mockWeatherService.getForecast.and.returnValue(of(forecastData));

    expect(component.showForecast).toBeFalse();

    component.toggleForecast();
    fixture.detectChanges();

    expect(component.showForecast).toBeTrue();
    expect(component.forecast.length).toBe(2);
  });

  it('should display forecast data when fetched', () => {
    const forecastData = [
      { date: '2024-10-15', temp: 20, condition: 'Clear' },
      { date: '2024-10-16', temp: 22, condition: 'Cloudy' },
    ];
    mockWeatherService.getForecast.and.returnValue(of(forecastData));

    component.toggleForecast();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const forecastElements = compiled.querySelectorAll('.forecast-day p');
    expect(forecastElements.length).toBe(2);
    expect(forecastElements[0].textContent).toContain('2024-10-15');
    expect(forecastElements[0].textContent).toContain('20°C');
    expect(forecastElements[1].textContent).toContain('2024-10-16');
    expect(forecastElements[1].textContent).toContain('22°C');
  });

  it('should display an error if forecast fetching fails', () => {
    mockWeatherService.getForecast.and.returnValue(throwError(() => new Error('Failed to load forecast')));

    component.toggleForecast();
    fixture.detectChanges();

    expect(component.error).toBe('Unable to load forecast');
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.text-red-600')?.textContent).toContain('Unable to load forecast');
  });
});
