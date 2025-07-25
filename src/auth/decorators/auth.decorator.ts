import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { Role } from "../enums/rol.enum";
import { Roles, ROLES_KEY } from "./roles.decorator";
import { AuthGuard } from "../guard/auth.guard";
import { RolesGuard } from "../guard/roles.guard";

export function Auth(...roles: Role[]){
    return applyDecorators(
        Roles(...roles),
        UseGuards(AuthGuard, RolesGuard)
    )
}