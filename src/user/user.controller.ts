import { Controller,Post,Body,Get,Param,Patch,Delete } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Post()
    adduser(
    @Body('username') userUsername: string,
    @Body('firstname') userFirstname: string,
    @Body('lastname') userLastname: string, 
    @Body('phone') userPhone: number,
    ) {
        const generatedId = this.userService.insertUser(
            userUsername,
            userFirstname,
            userLastname,
            userPhone,
        );
        return {id: generatedId}
    }
    @Get()
    getAllUsers() {
        return this.userService.getusers();
    }

    @Get(':id')
    getUser(@Param('id') userId: string,){
        return this.userService.getSingleUser(userId);
    }

    @Patch(':id')
    updateUser(
    @Param('id') userId: string,
    @Body('username') userUsername: string,
    @Body('firstname') userFirstname: string,
    @Body('lastname') userLastname: string, 
    @Body('phone') userPhone: number,
    ) {
        this.userService.updateUser(userId,userUsername,userFirstname,userLastname,userPhone);
        return null
    }

    @Delete(':id')
    removeUser(@Param('id') userId: string,) {
        this.userService.deleteUser(userId);
        return null;
    }

}