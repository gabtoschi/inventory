import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
//import { JwtPayload } from 'src/dtos/jwt-payload.dto';
//import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    private readonly user: User[] = [];

    static isLoggedIn = false;

    constructor(//private readonly jwtService: JwtService
        ) 
    {
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
    public loginUser(name: string, email: string, password: string): null | string {
    
        let userRegistered = false;
    
        this.user.forEach((user) => {
          if (user.email === email && user.password === password) {
            userRegistered = true;

            // const payload: JwtPayload = {
            //     email: user.email
            //   };

            // return { user, token: this.jwtService.sign(payload) };
          }
        });
    
        UserService.isLoggedIn = userRegistered;

        if(userRegistered == false){
            return 'E-mail or password wrong.';
        }else{
            return 'E-mail or password aproved.';
        }
        
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
