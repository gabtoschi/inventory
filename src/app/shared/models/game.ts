export class Game {
    slug: string;
    name: string;
    developer: string;
    publisher: string;
    platforms: string[];
    category: string;

    constructor(name: string, developer: string, publisher: string, category: string, platforms: string[]){
        this.name = name;
        this.developer = developer;
        this.publisher = publisher;
        this.category = category;
        this.platforms = platforms.sort();
        this.slug = this.generateSlug(name);
    }

    generateSlug(str: string): string {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();
      
        // remove accents, swap ñ for n
        var from = "àáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
        var to   = "aaaaaeeeeiiiioooouuuunc------";
    
        for (var i=0, l=from.length ; i<l ; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }
    
        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes
    
        return str;
    }

}