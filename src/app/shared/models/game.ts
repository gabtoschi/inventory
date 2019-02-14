export class Game {
    slug: string;
    name: string;
    developer: string;
    publisher: string;
    platforms: string[];
    category: string;

    constructor(name: string, developer: string, publisher: string, category: string, platforms: string[]) {
        this.name = name;
        this.developer = developer;
        this.publisher = publisher;
        this.category = category;
        this.platforms = platforms.sort();
        this.slug = this.generateSlug(name);
    }

    private generateSlug(str: string): string {
        str = str.replace(/^\s+|\s+$/g, '');
        str = str.toLowerCase();

        str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        str = str.replace(/\.|\/|_|,|:|;| /g, '-');

        return str;
    }
}
