

# Weather Dashboard

This is a weather dashboard application built with Angular. It allows users to add multiple cities and view their current weather conditions and 5-day forecasts. The application fetches real-time weather data from the OpenWeatherMap API.

## Features
- Add multiple cities and view the current weather for each.
- View temperature, weather conditions, and forecast for the next 5 days.
- Option to remove cities from the dashboard.
- Persistent storage of cities using LocalStorage.
- Smooth animations for toggling forecasts.
- Responsive design suitable for all device sizes.

## Technologies Used
- **Angular** (v18)
- **RxJS** for reactive programming and API calls.
- **Tailwind CSS** for responsive styling.
- **OpenWeatherMap API** for fetching weather data.
- **LocalStorage** for persistent city data.
- **Angular Animations** for smooth UI transitions.
- **Jasmine/Karma** for unit testing.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- **Node.js** (v14 or above)
- **Angular CLI** (v14 or above)
- **OpenWeatherMap API Key**

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

### Step 2: Install Dependencies

Run the following command to install all required packages:

```bash
npm install
```

### Step 3: Obtain OpenWeatherMap API Key

To fetch weather data, you need to obtain an API key from [OpenWeatherMap](https://openweathermap.org/api). Sign up for a free account and get your API key.

### Step 4: Configure the API Key

1. Once you have your API key, open the `src/environments/environment.ts` file and add your API key.

```typescript
// environment.ts
export const environment = {
  production: false,
  openWeatherApiKey: 'your-openweathermap-api-key'  // Replace with your API key
};
```

2. Similarly, configure the production environment in `src/environments/environment.prod.ts`.

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  openWeatherApiKey: 'your-openweathermap-api-key'  // Replace with your API key
};
```

### Step 5: Run the Application

Run the following command to start the development server:

```bash
ng serve
```

By default, the app runs on `http://localhost:4200`. You can open it in your browser to see the weather dashboard.

### Step 6: Running Unit Tests

The project includes unit tests written with Jasmine and Karma. To run the tests, use the following command:

```bash
ng test
```

### Optional: Build for Production

To build the app for production, run:

```bash
ng build --prod
```

The built assets will be stored in the `dist/` directory.

## Usage

1. **Add a City**: Enter the name of a city in the input field and click the **Add City** button. The city’s current weather and temperature will be displayed.
2. **View 5-Day Forecast**: Click the **Show Forecast** button to see the forecast for the next 5 days. Click **Hide Forecast** to collapse the forecast section.
3. **Remove a City**: Click the **Remove** button to delete a city from the dashboard.

## Project Structure

- **`src/app/components`**: Contains the main components (`app.component.ts`, `dashboard.component.ts`, `weather-card.component.ts`).
- **`src/app/services`**: Contains the `weather.service.ts` that handles API communication.
- **`src/assets`**: Contains static assets like images and icons.
- **`src/environments`**: Contains environment configuration files (e.g., for production and development).

## API Details

The application uses the **OpenWeatherMap API** to fetch current weather and 5-day forecast data.

- **API Base URL**: `https://api.openweathermap.org/data/2.5/`
- **Endpoints**:
  - `/weather`: Used to fetch current weather data.
  - `/forecast`: Used to fetch the 5-day weather forecast.
- **Query Parameters**:
  - `q`: City name (e.g., `q=London`)
  - `appid`: Your API key from OpenWeatherMap.
  - `units`: The unit of measurement (e.g., `units=metric` for Celsius).

Example API call:
```
https://api.openweathermap.org/data/2.5/weather?q=London&appid=your_api_key&units=metric
```

## Troubleshooting

- **API Key Issues**: Ensure that the API key is valid and correctly placed in the `environment.ts` or `environment.prod.ts` file.
- **CORS Errors**: If you encounter CORS issues while running locally, ensure you are not using browser extensions that block CORS.
- **Performance**: If the app slows down with too many cities, consider adding a limit to the number of cities a user can add.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
- **OpenWeatherMap** for providing the weather data.
- **Tailwind CSS** for responsive and utility-first CSS styling.
- **Angular** for the robust front-end framework.

