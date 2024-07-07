import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'testimony' })
export class Testimony {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //   @Column({ type: 'varchar', length: 40, nullable: false })
  //   name: string;

  //   @Column({ type: 'varchar', length: 40, nullable: false })
  //   email: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'int', nullable: true })
  punctuation: number;

}
