export const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    try {
      navigator.geolocation.watchPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchWeather = async (latitude, longitude) => {
  try {
    const fetchApiResponse = await fetch(
      `http://api.airvisual.com/v2/nearest_city?lat=${latitude}&lon=${longitude}&key=0cace61b-36de-4899-a7d6-1dc163cb74c7`
    );
    const responseData = await fetchApiResponse.json();
    return {
      city: responseData.data.city,
      country: responseData.data.country,
      humidity: responseData.data.current.weather.hu,
      temperature: responseData.data.current.weather.tp,
    };
  } catch (error) {
    throw error;
  }
};
