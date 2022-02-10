import {config} from "dotenv";
config({path: `${__dirname}/.env.${process.env.NODE_ENV}`})
import dbConnect from './components/servers/DatabaseServer';
import ExpressApp from "./components/servers/ExpressServer"; 
import DisCordServer from "./components/servers/DiscordServer";

export default async function main() {
  try {
    await dbConnect();
    await ExpressApp();
    await DisCordServer();
  } catch (err) {
    console.error(`Couldn't start`, err);
    process.exit(1);
  }
}

main()
