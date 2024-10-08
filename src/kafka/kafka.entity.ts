import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // Name of the table in MySQL
export class TelemetryTesla {
  @PrimaryGeneratedColumn() // Auto-incrementing primary key
  id: number;

  @Column({ nullable: true }) // Define a column for latitude that can be null
  location_latitude: string | null; // Specify that it can be null
  
  @Column({ nullable: true }) // Define a column for longitude that can be null
  location_longitude: string | null; // Specify that it can be null

  @Column({ nullable: true }) // Define a column for charge state that can be null
  charge_state: string | null; // Specify that it can be null
  
  @Column() // Explicitly define column type for createdAt
  createdAt: Date;
}
