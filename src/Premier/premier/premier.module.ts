/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PremierController } from './premier/premier.controller';

@Module({
  controllers: [PremierController]
})
export class PremierModule {}
