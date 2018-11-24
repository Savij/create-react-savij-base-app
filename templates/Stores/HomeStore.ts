module.exports = `import { action, decorate, observable } from 'mobx';
import HomeService from '../Services/HomeService';
import StoreBase from './StoreBase';

export class HomeStore extends StoreBase {
    public homeService: HomeService;
    public textValue: string;

    constructor() {
        super();
        this.homeService = new HomeService();
    }

    public async serviceCall() {
        try {
            await this.homeService.apiCall();
        } catch (error) {
            console.log(error);
        }
    }

    public textChange(data: string) {
        this.textValue = data;
    }
}
decorate(HomeStore, {
    textValue: observable,
    textChange: action
});`