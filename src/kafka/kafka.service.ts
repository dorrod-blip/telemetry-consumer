import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelemetryTesla } from './kafka.entity'; // Import your entity
import { time } from 'console';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private kafka = new Kafka({
    clientId: 'telemetry-service',
    brokers: ['localhost:9093'], // Update with your broker address
  });
  private consumer = this.kafka.consumer({ groupId: 'telemetry' });

  constructor(
    @InjectRepository(TelemetryTesla)
    private telemetryRepository: Repository<TelemetryTesla>,
  ) {}

  async onModuleInit() {
    console.log('onModuleInit');
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: 'telemetry_V', fromBeginning: true });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const binaryData = message.value;
          const telemetry_data = JSON.parse(binaryData.toString('utf-8'));
          const datestring = telemetry_data.createdAt;
          const datetime = new Date(datestring);
          const location = telemetry_data.data.find(item => item.key === 'Location');
          const charging = telemetry_data.data.find(item => item.key === 'ChargeState');
    
          const location_value = location?.value?.locationValue;
          console.log("telemetry live data: ", telemetry_data.data);
          console.log("telemetry location: ", location_value);
          console.log("telemetry charging: ", charging?.value);
          
          const latitude = location_value?.latitude;
          const longitude = location_value?.longitude;

          if (latitude !== undefined && longitude !== undefined) {
            const data = {
              location_latitude: latitude,
              location_longitude: longitude,
              charge_state: charging ? charging.value : null,
              createdAt: datetime,
            };
  
            await this.saveData(data);
          }
        } catch (error) {
          console.error(`Error processing message: ${error.message}`);
          console.error(`Raw message: ${message.value.toString()}`);
        }
      },
    });    
  }

  private async saveData(data: any) {
    const telemetryData = this.telemetryRepository.create(data);
    await this.telemetryRepository.save(telemetryData);
  }
}
