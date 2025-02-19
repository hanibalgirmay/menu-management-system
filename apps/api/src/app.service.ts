import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      message: 'Welcome This is system start point',
      developedBy: {
        name: 'Hanibal Girmay',
        email: 'hanibalgirmay@gmail.com',
        phone: '+251922850480',
        title: 'Software Engineer',
      },
    };
  }
}
