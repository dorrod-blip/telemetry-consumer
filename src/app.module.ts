import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelemetryTesla } from './kafka/kafka.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: '54.161.235.213',
    port: 3306,
    username: 'tesla',
    password: 'Admin123!!@@##',
    database: 'tesla_telemetry',
    entities: [TelemetryTesla],
    synchronize: true,
  }),
  KafkaModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
