import { TestWrapperOptions, using, TestWrapper, should } from "aft-core";
import { HttpRequest, HttpResponse, HttpService } from 'aft-web-services';
import { ListUsersResponse } from "./response-objects/list-users-response";
import 'aft-logging-awskinesis/dist/src/kinesis-logging-plugin';
import 'aft-testrail/dist/src/logging/testrail-logging-plugin';

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
                await tw.logger.step('making request...');
                response = await HttpService.instance.performRequest(request);
                await tw.logger.info('request completed and received status code: ' + response.statusCode);
            });

            await tw.check('C3131', async () => {
                await tw.logger.step('confirm response is not null...');
                should(() => expect(response).not.toBeNull()).because('a valid response object was expected');
                await tw.logger.info('confirmed response is not null.');
                await tw.logger.step('confirm response.data is not null...');
                should(() => expect(response.data).not.toBeNull()).because('a valid response.data was expected');
                await tw.logger.info('confirmed response.data is not null.');
            });

            await tw.check('C2217764', async () => {
                await tw.logger.step('confirm can deserialise response.data into typed object...');
                let obj: ListUsersResponse = response.dataAs<ListUsersResponse>();
                should(() => expect(obj).not.toBeNull()).because('deserialisation of response.data into ListUsersResponse should work');
                await tw.logger.info('confirmed can deserialise response.data into typed object.');
                await tw.logger.step('confirm object data property contains more than one result...');
                should(() => expect(obj.data.length).toBeGreaterThan(0)).because('the api should always return users');
                await tw.logger.info('confirmed object data property contains more than one result.');
            });
        });
    });
});