import { Injectable } from '@nestjs/common';

import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {
    private readonly user: User[] = [];

    constructor() {
        this.create(new User('nome1', 'email', 'senha'));
        this.create(new User('nome2', 'email', 'senha'));
        this.create(new User('nome3', 'email', 'senha'));
    }

    public getAll(): User[] {
        return this.user;
    }


    public create(newUser: User) {
        this.user.push(newUser);
    }

    public getByEmail(email: string): User {
        for (const usuario of this.user) {
            if (usuario.email === email) {
                return usuario;
            }
        }
        return null;
    }

    // public removeBySlug(slug: string): boolean {
    //     for (const game of this.games) {
    //         if (game.slug === slug) {
    //             this.games.splice(this.games.indexOf(game), 1);
    //             return true;
    //         }
    //     }

    //     return false;
    // }

    // public editBySlug(slug: string, newInfo: Game): boolean {
    //     // correcting the slug
    //     newInfo.slug = slug;

    //     if (!this.removeBySlug(slug)) {
    //         return false;
    //     }

    //     this.create(newInfo);

    //     return true;
    // }

}
