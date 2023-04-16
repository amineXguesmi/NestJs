/* eslint-disable prettier/prettier */
import { TodoStatusEnum } from '../spec-class/todo';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator';
import validatorsErrorMessages from '../validator-error-message';

export default class UpdateTodoDTO {
    @IsNotEmpty({ message: validatorsErrorMessages.REQUIRED })
    id: string ;
    @MinLength(3, { message: `${validatorsErrorMessages.MIN_LENGTH}1` })
    @MaxLength(10, { message: `${validatorsErrorMessages.MAX_LENGTH}2` })
    name: string | null;
    @MinLength(10, { message: `${validatorsErrorMessages.MIN_LENGTH}1` })
    description: string | null;
    @IsOptional()
    @IsEnum(TodoStatusEnum, { message: `${validatorsErrorMessages.IS_Enum}2` })
    status: TodoStatusEnum | null;
}
