import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { JwtPayload } from 'src/dtos/jwt-payload.dto';

@Injectable()
export class UserService {

    private readonly user: User[] = [];

    static isLoggedIn = false;

    constructor() {
        this.registerUser(new User('nome1', 'email', 'senha'));
        this.registerUser(new User('nome2', 'email', 'senha'));
        this.registerUser(new User('nome3', 'email', 'senha'));
    }

    public getAll(): User[] {
        return this.user;
    }


    public getByEmail(email: string): User {
        for (const usuario of this.user) {
            if (usuario.email === email) {
                return usuario;
            }
        }
        return null;
    }

    public registerUser(newUser: User): null | string {

        for (let userIt of this.user){
            if (userIt.email === newUser.email) {
                return ('Already exists a registered user with this e-mail.');
            }
        }
    
        let usuario = new User(newUser.name, newUser.email,newUser.password);
        this.user.push(usuario);
    
        return null;
    }
    
      // confirm a user login
    public loginUser(login: User): null | string {
    
        let userRegistered = false;
    
        this.user.forEach((user) => {
          if (user.email === login.email && user.password === login.password) {
            userRegistered = true;
            // esperando jwt 
          }
        });
    
        UserService.isLoggedIn = userRegistered;
        return userRegistered ? null : 'E-mail or password wrong.';
        
    }
    
      // make a user logout
    public logoutUser(): boolean {
        if (UserService.isLoggedIn) {
            UserService.isLoggedIn = false;
          return true;
        } return false;
    }

    public validateEmail(validateUser: User): null | boolean {

        for (let userIt of this.user){
            if (userIt.email === validateUser.email) {
                return true;
            }
        }
        return null;
    }

}
