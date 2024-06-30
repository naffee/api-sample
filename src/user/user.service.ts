import { Injectable,NotFoundException } from "@nestjs/common";
import {User} from "./user.model"
@Injectable()
export class UserService{
    private user: User[] = [];

    insertUser(username: string, firstname: string, lastname: string, phone: number){
    const userId = Math.random().toString();
    const newUser = new User(userId,username,firstname,lastname,phone);
    this.user.push(newUser);
    return userId;
    }
    getusers() {
        return [...this.user];
    }

    getSingleUser(userId: string){
        const user = this.findUser(userId)[0];
        return {...user};
    }

    updateUser(
        userId: string,
        username: string,
        firstname: string,
        lastname: string,
        phone: number) {
            const [user, index] =this.findUser(userId);
            const updatedUser = {...user};
            if (username) {
                updatedUser.username = username
            }
            if (firstname) {
                updatedUser.firstname = firstname
            }
            if (lastname) {
                updatedUser.lastname = lastname
            }
            if (phone) {
                updatedUser.phone = phone
            }

            this.user[index] = updatedUser;


        }

        deleteUser(userId:string){
            const index= this.findUser(userId)[1];
            this.user.splice(index, 1);
        }

        private findUser(id: string): [User, number] {
            const userIndex = this.user.findIndex(user => user.id === id);
            const user = this.user[userIndex];
        if (!user){
            throw new NotFoundException('could not find user')
        }
        return [user,userIndex]
        }
    }
