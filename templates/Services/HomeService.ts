module.exports = `export default class HomeService {
    public async apiCall() {
        return await setTimeout(() => { }, 100, 'foo');
    }
}`