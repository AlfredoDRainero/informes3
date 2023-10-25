export function convertTo24HourFormat(timeString) {
    // Verifica si la cadena contiene "am" o "pm" (case-insensitive)
    const is12HourFormat = /am|pm/i.test(timeString);
  
    if (is12HourFormat) {
      const [time, period] = timeString.split(' ');
      const [hour, minutes, seconds] = time.split(':');
  
      let hour24 = parseInt(hour, 10);
  
      if (period.toLowerCase() === 'pm' && hour24 < 12) {
        hour24 += 12;
      } else if (period.toLowerCase() === 'am' && hour24 === 12) {
        hour24 = 0;
      }
  
      const hour24String = hour24.toString().padStart(2, '0');
      const minutesString = minutes.padStart(2, '0');
      const secondsString = seconds.padStart(2, '0');
  
      return `${hour24String}:${minutesString}:${secondsString}`;
    }
  
    // Si no contiene "am" o "pm", asumimos que ya está en formato de 24 horas
    return timeString;
  }