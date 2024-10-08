import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KafkaConsumerService } from './kafka.service';
import { TelemetryTesla } from './kafka.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TelemetryTesla]),
  ],
  providers: [KafkaConsumerService],
  exports: [KafkaConsumerService],
})
export class KafkaModule {}
