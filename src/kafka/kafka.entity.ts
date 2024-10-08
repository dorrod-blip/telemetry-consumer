import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Name of the table in MySQL
export class TelemetryData {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number;

  @Column() // Define a column for sensor ID
  location: string;

  @Column() // Define a column for the value
  charging: string;

  @Column() // Define a column for the value
  soc: string;

  @Column() // Define a column for the timestamp
  timestamp: Date;
}
