import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnModuleInit {
  onModuleInit() {
    console.log('AppService initialized');
  }

  getMadLessons(): string {
    return 'Welcome to MAD Lessons!';
  }
}
