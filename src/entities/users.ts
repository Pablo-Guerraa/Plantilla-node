import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Role } from './roles';

@Entity()

export class User {
  /** The client's UID Firebase Auth */
  @PrimaryColumn()
    uid: string;

  /** The Client's name */
  @Column()
    name: string;
    
  @Column()
    email: string;
    
  @Column({
    default: true
  })
    status: boolean;

  @UpdateDateColumn()
    updatedAt: Date;

  @CreateDateColumn()
    createdAt: Date;

  @ManyToOne(() => Role, role => role.id)
    role: Role;
}