export type NodeEnv = 'development' | 'production';

export class Env {
    public static jwtSecret = () => process.env.JWT_SECRET || 'JWT_SUPER_SECRET';
    public static jwtExpire = () => process.env.JWT_EXPIRE ? parseInt(process.env.JWT_EXPIRE, 10) : 24 * 3600;
}
