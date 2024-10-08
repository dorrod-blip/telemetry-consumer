import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaConsumerService } from './kafka.service';
import { TelemetryData } from './kafka.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TelemetryData]),
  ],
  providers: [KafkaConsumerService],
  exports: [KafkaConsumerService],
})
export class KafkaModule {}
