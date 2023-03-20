import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ILesson } from './lesson.interface';
import { CategoryEntity } from '../category/category.entity';

@Entity('lesson')
export class LessonEntity implements ILesson {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'id' })
  id: number;

  @OneToMany((type) => CategoryEntity, (category) => category.id)
  category_id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  image_src: string;

  @Column({ type: 'varchar', length: 255 })
  image_alt: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
