import { IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";
import { Breed } from "src/breeds/entities/breed.entity";

export class CreateCatDto {

    // Campo id es autogenerado 

    @IsString()
    @MinLength(1)
    name: string;


    @IsNumber()
    @IsPositive()
    age: number;

    @IsNumber()
    @IsOptional()
    breedId: number

}
