/* eslint-disable prettier/prettier */
import { IsOptional } from "class-validator";
import { TodoStatusEnum } from "../spec-class/todo";

export default class FindTodoFilterDTO {
    @IsOptional()
    description: string ;
    @IsOptional()
    status: TodoStatusEnum ;
    @IsOptional()
    page: number;
    @IsOptional()
    take: number ;
}

