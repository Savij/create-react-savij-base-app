module.exports = `import { HomeStore } from './HomeStore';

export class Stores {
    private static instance: Stores;
    public homeStore: HomeStore;

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    public constructor() {
        this.homeStore = new HomeStore();
    }
}`