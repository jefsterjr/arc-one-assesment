import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../models/course';
import {CourseService} from '../../course/course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-enrollment',
  templateUrl: './course-enrollment.component.html',
  styleUrls: ['./course-enrollment.component.css']
})
export class CourseEnrollmentComponent implements OnInit {
  courses: Course[] = [];
  enrollments: CourseEnrollment[] = [];

  constructor(
    private courseService: CourseService,
    private enrollmentService: CourseEnrollmentService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
    });

    this.enrollmentService.getEnrollmentsByStudentId(1).subscribe(enrollments => {
      this.enrollments = enrollments;
    });
  }

  enroll(courseId: number): void {
    const enrollment: CourseEnrollment = {
      studentId: 1, // Replace with actual student ID
      courseId
    };

    this.enrollmentService.enroll(enrollment).subscribe(enrollment => {
      this.enrollments.push(enrollment);
    });
  }

  unenroll(enrollmentId: number): void {
    this.enrollmentService.deleteEnrollment(enrollmentId).subscribe(() => {
      this.enrollments = this.enrollments.filter(e => e.id !== enrollmentId);
    });
  }

}
