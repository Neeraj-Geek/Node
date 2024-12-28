import dotenv from "dotenv";
import axios from "axios";
import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
dotenv.config();
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
let API_KEY = process.env.WEATHER_API_ID;
const fetchData = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", // Temperature in Celsius
      },
    });
    console.log(chalk.greenBright(`Weather in ${city}:`));
    console.log(chalk.greenBright(`Temperature: ${response.data.main.temp}°C`));
    console.log(
      chalk.greenBright(`Description: ${response.data.weather[0].description}`)
    );
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(
        chalk.redBright("City not found. Please enter a valid city name.")
      );
    } else {
      console.log(chalk.redBright("An error occurred:", error.message));
    }
  }
};
const argv = yargs(hideBin(process.argv))
  .command({
    command: "get",
    describe: "Weather by city",
    builder: {
      city: {
        describe: "city",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      try {
        fetchData(argv.city);
      } catch (error) {
        console.log(error);
      }
    },
  })
  .parse();
