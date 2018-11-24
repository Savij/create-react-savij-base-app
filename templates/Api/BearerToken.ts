module.exports = `export class BearerToken {
    private static instance: BearerToken;
    public accessToken = '';

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }
}`