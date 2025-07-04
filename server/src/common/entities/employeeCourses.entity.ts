import { Entity, PrimaryColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { EmployeeEntity } from 'src/employee/entities/employee.entity';
import { CoursesEntity } from 'src/courses/entity/courses.entity';

@Entity('employee_courses')
export class EmployeeCoursesEntity {
  @PrimaryColumn({ name: 'employee_id' })
  employeeId: string;

  @PrimaryColumn({ name: 'course_id' })
  courseId: string;

  @Column({ name: 'status', type: 'boolean' })
  status: boolean;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.employeeCoursesLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'employee_id' })
  employee: EmployeeEntity;

  @ManyToOne(() => CoursesEntity, (course) => course.employeeCoursesLink, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'course_id' })
  course: CoursesEntity;
}
