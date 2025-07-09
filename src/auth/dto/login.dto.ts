import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto{
    @IsEmail()
    @MinLength(4)
    email: string;
    
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string

}