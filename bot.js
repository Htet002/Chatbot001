const axios = require('axios');
const{Telegraf} =require('telegraf');
const TOKEN ='6280925935:AAEFN-uC2TB4SxhxuUNepgOkty3sjKxq6JI';
const bot = new Telegraf(TOKEN);
const Url =
  'http://api.weatherstack.com/current?access_key=8cc26e500b49756fa3f3b267fb830767&query="';

  const fetchData = async (cityName) => {
    const res = await axios.get(`${Url + cityName}`);
     console.log(res.data)
     return res;
  };

  
  bot.start((ctx) => {
    ctx.reply("Welcome to weather bot"+ "\n" +"You can ask weather condition of any city in the world");
  });
  
  bot.on("text", async (ctx) => {
    const { message } = ctx;
    const { data } = await fetchData(message.text);
    if (data.success === false) {
      ctx.reply("Invalid City.Please enter a valid city name:");
    } else {
      const { current, location } = data;
      const weatherStatus = current.weather_descriptions[0];
  
      ctx.reply(
        `🌆 City:${location.name}\n-\n 🌡 Temperature ${
          current.temperature
        }°\n-\n❓ Weather status: ${
          (weatherStatus.toLowerCase().includes("clear") === true && "☀️") ||
          (weatherStatus.toLowerCase().includes("sunny") === true && "☀️") ||
          (weatherStatus.toLowerCase().includes("cloud") === true && "☁️") ||
          (weatherStatus.toLowerCase().includes("overcast") === true && "☁️") ||
          (weatherStatus.toLowerCase().includes("rain") === true && "🌧") ||
          (weatherStatus.toLowerCase().includes("snow") === true && "❄️")
        } ${current.weather_descriptions[0]}`
      );
    }
  });
  
  bot.launch();
  