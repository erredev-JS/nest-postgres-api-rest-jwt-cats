import { IsString, MinLength } from "class-validator";

export class CreateBreedDto {

    // Id es autogenerado

    @IsString()
    @MinLength(1)
    
    name: string
}
