import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryData } from './kafka/kafka.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Admin123!!@@##',
    database: 'tesla_telemetry',
    entities: [TelemetryData],
    synchronize: true,
  }),
  KafkaModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
