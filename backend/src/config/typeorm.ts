import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env.development'});

const config = {
    type: 'postgres',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities:['dist/**/*.entity{.ts,.js}'],
    logging:false,
    autoLoadEntities: true,
    synchronize: true,
    dropSchema: true,
};

export default registerAs('typeorm', () => config);
const connectionSource = new DataSource(config as DataSourceOptions);