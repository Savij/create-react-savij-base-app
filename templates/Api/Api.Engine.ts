module.exports = `import * as axios from 'axios';
import * as qs from 'query-string';
import SharedItems from '../Stores/SharedItems';

enum HTTPMethod {
    GET,
    POST,
    DELETE,
    PATCH,
    PUT
}

class OKClient {
    public execute<T>(request: OKRequest<T>) {
        if (request.includeAuthorizationHeader) {
            request.withHeader({ 'Authorization': \`Bearer \${SharedItems.authToken.token}\` });
        }
        return this.executeHTTPRequest(request);
    }

    private executeHTTPRequest<T>(request: OKRequest<T>) {
        return new Promise<T>((resolve, reject) => {
            const config: Axios.AxiosXHRConfig<any> = {
                data: request.data,
                headers: request.headers,
                method: 'GET',
                url: request.buildUrl()
            };
            if (request.httpMethod === HTTPMethod.POST) {
                config.method = 'POST';
            } else if (request.httpMethod === HTTPMethod.DELETE) {
                config.method = 'DELETE';
            } else if (request.httpMethod === HTTPMethod.PATCH) {
                config.method = 'PATCH';
            } else if (request.httpMethod === HTTPMethod.PUT) {
                config.method = 'PUT';
            }

            return axios(config)
                .then(response => {
                    const okObject = response.data as T;
                    resolve(okObject);
                }).catch(error => {
                    this.errorHandler(error, reject);
                });
        });
    }

    private errorHandler(error: any, reject: any) {
        if (error && error.response) {
            if (error.response.status === 401) {
                reject(error);
            } else {
                reject(error);
            }
        } else {
            reject(error);
            throw ('error during api call');
        }

    }
}

export class OKRequest<T> {
    public baseUrl: string;
    private client: OKClient;
    public includeAuthorizationHeader: boolean;
    public url: string;
    public httpMethod: HTTPMethod;
    public data: Object;
    public headers: { [key: string]: any; };
    public queryString: { [key: string]: string };
    public isMockedDataMode: boolean;

    public constructor(baseUrl?: string, isMockedDataMode = false) {
        this.baseUrl = baseUrl || location.origin;
        this.client = new OKClient();
        this.url = '';
        this.httpMethod = HTTPMethod.GET;
        this.data = {};
        this.headers = {};
        this.queryString = {};
        this.includeAuthorizationHeader = false;
        this.isMockedDataMode = isMockedDataMode;
    }

    public buildUrl() {
        let requestUrl = this.baseUrl;
        if (this.url) {
            const separator = this.url.startsWith('/') ? '' : '/';
            requestUrl = \`\${requestUrl}\${separator}${this.url}\`;
        }
        if (Object.keys(this.queryString).length > 0) {
            requestUrl = \`\${requestUrl}?\${qs.stringify(this.queryString)}\`;
        }
        return requestUrl;
    }

    public get(url: string) {
        this.httpMethod = HTTPMethod.GET;
        this.url = url;
        return this;
    }

    public post(url: string) {
        this.httpMethod = HTTPMethod.POST;
        this.url = url;
        return this;
    }

    public put(url: string) {
        this.httpMethod = HTTPMethod.PUT;
        this.url = url;
        return this;
    }

    public patch(url: string) {
        this.httpMethod = HTTPMethod.PATCH;
        this.url = url;
        return this;
    }

    public delete(url: string) {
        this.httpMethod = HTTPMethod.DELETE;
        this.url = url;
        return this;
    }

    public withJsonData(data: Object) {
        this.data = JSON.stringify(data);
        return this.withHeader({ 'Content-Type': 'application/json' });
    }

    public withUrlEncodedData(data: Object) {
        this.data = \`=\${data}\`;
        return this.withHeader({ 'Content-Type': 'application/x-www-form-urlencoded' });
    }

    public withNonJsonData(data: Object, header: Object) {
        this.data = qs.stringify(Object.assign({}, this.data, data));
        this.headers = Object.assign({}, this.headers, header);
        return this;
    }

    public withMultiPartData(data: Object) {
        this.data = data;
        this.headers = Object.assign({}, this.headers, { 'content-type': 'multipart/form-data' });
        return this;
    }

    public withHeader(header: Object) {
        this.headers = Object.assign({}, this.headers, header);
        return this;
    }

    public withQueryString(query: Object) {
        this.queryString = Object.assign({}, this.queryString, query);
        return this;
    }

    public execute(): Promise<T> {
        // if (this.isMockedDataMode) {
        //     return new MockedData<T>().getMockedData(this.url);
        // }

        return this.client.execute<T>(this);
    }
}`