import { TestWrapperOptions, using, TestWrapper } from "aft-core";
import { HttpRequest, HttpResponse, HttpService } from 'aft-web-services';
import { ListUsersResponse } from "./response-objects/list-users-response";

describe('REST Request', () => {
    beforeAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    });

    it('can make GET request from JSON REST API', async () => {
        let options: TestWrapperOptions = new TestWrapperOptions('can make GET request from JSON REST API');
        options.testCases.addRange('C2217763', 'C3131', 'C2217764');
        await using(new TestWrapper(options), async (tw) => {
            let request = new HttpRequest();
            let response: HttpResponse;
            request.url = 'https://reqres.in/api/users?page=2';

            await tw.check('C2217763', async () => {
                tw.logger.step('making request...');
                response = await HttpService.instance.performRequest(request);
                tw.logger.info('request completed and received status code: ' + response.statusCode);
            });

            await tw.check('C3131', async () => {
                tw.logger.step('confirm response is not null...');
                expect(response).not.toBeNull();
                tw.logger.info('confirmed response is not null.');
                tw.logger.step('confirm response.data is not null...');
                expect(response.data).not.toBeNull();
                tw.logger.info('confirmed response.data is not null.');
            });

            await tw.check('C2217764', async () => {
                tw.logger.step('confirm can deserialise response.data into typed object...');
                let obj: ListUsersResponse = response.dataAs<ListUsersResponse>();
                expect(obj).not.toBeNull();
                tw.logger.info('confirmed can deserialise response.data into typed object.');
                tw.logger.step('confirm object data property contains more than one result...');
                expect(obj.data.length).toBeGreaterThan(0);
                tw.logger.info('confirmed object data property contains more than one result.');
            });
        });
    });
});