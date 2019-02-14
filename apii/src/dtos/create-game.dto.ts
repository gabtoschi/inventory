export class CreateGameDto {
    public readonly name: string;
    public readonly developer: string;
    public readonly publisher: string;
    public readonly platforms: string[];
    public readonly category: string;
}
