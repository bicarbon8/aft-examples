# AFT-Examples
Automation Framework for Testing (AFT) repo providing examples and best practices for using the Framework. This repo can serve as a quick-start project for functional testing projects.

## Usage:
using this code requires setting configuration values in the `aftconfig.json` depending on the type of testing you're planning on performing.

### Example `aftconfig.json`

```json
{
    "testloglevel": "info",
    "test_platform": "windows_10_chrome",
    "session_provider": "BrowserStackSession",
    "browserstack_user": /* your BrowserStack user */,
    "browserstack_accesskey": /* your BrowserStack Access Key */,
    "testrail_write": "true",
    "testrail_user": /* your TestRail email address */,
    "testrail_encoded_pass": /* a Base64 encoded copy of your TestRail password */,
    "testrail_planid": "12345",
    "kinesisfirehose_enabled": "true",
    "kinesisfirehose_regionendpoint": "us-west-1",
    "kinesisfirehose_deliverystream": /* your Kinesis Delivery Stream name */,
    "aws_credential_retrieval": "config",
    "aws_access_key_id": /* your AWS IAM access key id */,
    "aws_secret_access_key": /* your AWS IAM secret access key */,
    "aws_session_token": /* if your IAM access key is temporary use this */
}
```
- *testloglevel* - the lowest level of logging to allow. valid values are (`trace`|`debug`|`info`|`step`|`warn`|`error`)
- *test_platform* - a string describing the platform, browser and device details to be used for UI testing. uses the following format: `[os-name[_os-version[_browser-name[_browser-version[_device-name]]]]` like `android_7.2_browser_10_Samsung Galaxy SIII` or `windows_8.1_firefox`
- *session_provider* - the name exposed by `ISessionGenerator` implementations. the `aft-ui-selenium` package exposes the following valid values (`BrowserStackSession`|`SauceLabsSession`|`SeleniumGridSession`) where the latter can be used for your own Selenium Grid instance
  - if using `BrowserStackSession` you must also provide values for `browserstack_user` and `browserstack_accesskey` using the values BrowserStack provides in your account
  - if using `SauceLabsSession` you must also provide values for `sauce_username` and `sauce_access_key` using the values Sauce Labs provides in your account
  - if using `SeleniumGridSession` you must provide a value for the Selenium Grid Hub using `selenium_grid_url` *(NOTE: this could simply be http://localhost:4444/wd/hub if running locally using default configuration)*
- *testrail_write* - set to `"true"` to enable logging test results to an existing TestRail Plan. if *testrail_write* is `"true"` you must also provide values for the following:
  - `testrail_user` must be set to the email address of a TestRail user with write permissions to the designated TestRail Plan
  - `testrail_encoded_pass` must be set to a Base64 encoded version of the above user's password in TestRail
  - `testrail_plan` must be the numeric TestRail Plan ID for the pre-existing plan where results will be written
- *kinesisfirehose_enabled* - set to `"true"` to enable logging of Test Results to a designated AWS Kinesis Firehose stream. if *kinesisfirehose_enabled* is set to `"true"` you must also provide values for the following:
  - `kinesisfirehose_regionendpoint` must be set to the AWS Region string where the Kinesis Firehose endpoint is deployed. valid values will look like, but are not limited to: `eu-west-1` or `us-west-1`
  - `kinesisfirehose_deliverystream` must be set to the Kinesis Firehose Delivery Stream name to be used in logging
  - `aws_credential_retrieval` must be set to a value of either (`instance`|`config`|`credsfile`) where `instance` will read credentails from an Instance Profile attached to your EC2, `config` will read from the `aftconfig.json` file and `credsfile` will read from the AWS _.credentials_ file on the local instance. if using a value of `config` you must also specify the following values:
    - `aws_access_key_id` must be set to your IAM user's Access Key
    - `aws_secret_access_key` must be set your IAM user's Secret Access Key
    - if using a Temporary session, you must also specify a value for the `aws_session_token`

## Test Execution
executing the tests using `npm test` should result in the following output to the console:

```
Randomized with seed 57367
Started
3:02:29 PM STEP  - [can_make_GET_request_from_JSON_REST_API] 1: making request...
.
3:02:29 PM INFO  - [can_make_GET_request_from_JSON_REST_API] request completed and received status code: 200
3:02:29 PM PASS  - [can_make_GET_request_from_JSON_REST_API] Passed - C2217763:
3:02:29 PM STEP  - [can_make_GET_request_from_JSON_REST_API] 2: confirm response is not null...
3:02:29 PM INFO  - [can_make_GET_request_from_JSON_REST_API] confirmed response is not null.
3:02:29 PM STEP  - [can_make_GET_request_from_JSON_REST_API] 3: confirm response.data is not null...
3:02:29 PM INFO  - [can_make_GET_request_from_JSON_REST_API] confirmed response.data is not null.
3:02:29 PM PASS  - [can_make_GET_request_from_JSON_REST_API] Passed - C3131:
3:02:29 PM STEP  - [can_make_GET_request_from_JSON_REST_API] 4: confirm can deserialise response.data into typed object...
3:02:29 PM INFO  - [can_make_GET_request_from_JSON_REST_API] confirmed can deserialise response.data into typed object.
3:02:29 PM STEP  - [can_make_GET_request_from_JSON_REST_API] 5: confirm object data property contains more than one result...
3:02:29 PM INFO  - [can_make_GET_request_from_JSON_REST_API] confirmed object data property contains more than one result.
3:02:29 PM PASS  - [can_make_GET_request_from_JSON_REST_API] Passed - C2217764:
.
3:02:42 PM STEP  - [can_access_websites_using_AFT_and_Page_Widgets_and_Facets] 1: navigate to LoginPage
3:03:07 PM PASS  - [can_access_websites_using_AFT_and_Page_Widgets_and_Facets] Passed - C1234:
3:03:07 PM STEP  - [can_access_websites_using_AFT_and_Page_Widgets_and_Facets] 2: login
3:03:25 PM PASS  - [can_access_websites_using_AFT_and_Page_Widgets_and_Facets] Passed - C2345:
3:03:25 PM STEP  - [can_access_websites_using_AFT_and_Page_Widgets_and_Facets] 3: wait for message to appear...
3:03:27 PM STEP  - [can_access_websites_using_AFT_and_Page_Widgets_and_Facets] 4: get message
3:03:41 PM PASS  - [can_access_websites_using_AFT_and_Page_Widgets_and_Facets] Passed - C3456:
3:03:56 PM STEP  - [can_recover_from_StaleElementExceptions_automatically] 1: navigate to LoginPage
3:04:16 PM PASS  - [can_recover_from_StaleElementExceptions_automatically] Passed - C4567:
3:04:16 PM STEP  - [can_recover_from_StaleElementExceptions_automatically] 2: click login button
3:04:38 PM INFO  - [can_recover_from_StaleElementExceptions_automatically] no exception thrown on click
3:04:38 PM PASS  - [can_recover_from_StaleElementExceptions_automatically] Passed - C5678:
3:04:38 PM STEP  - [can_recover_from_StaleElementExceptions_automatically] 3: refresh page
3:04:38 PM INFO  - [can_recover_from_StaleElementExceptions_automatically] page refreshed
3:04:38 PM PASS  - [can_recover_from_StaleElementExceptions_automatically] Passed - C6789:
3:04:38 PM STEP  - [can_recover_from_StaleElementExceptions_automatically] 4: click login button
3:04:40 PM INFO  - [can_recover_from_StaleElementExceptions_automatically] no exception thrown on click
3:04:40 PM PASS  - [can_recover_from_StaleElementExceptions_automatically] Passed - C7890:
.


3 specs, 0 failures
Finished in 137.465 seconds
Randomized with seed 57367 (jasmine --random=true --seed=57367)
```

## TestRail Logging
if using an `aftconfig.json` value of `"testrail_write": "true"` then you must first update the ID's referenced in the spec files. The values used must be the TestRail Case ID's referenced by your existing TestRail Plan (not to be confused with the TestRail Test ID's that start with the letter _T_). Modifications will need to be made in two places per test:

### TestWrapperOptions
in the `TestWrapperOptions` object, modify the following:

```typescript
opts.testCases.addRange('C1234', 'C2345', 'C3456');
```

specifying the TestRail Case ID's for the Cases you wish to cover.

### TestWrapper.check
in any `tw.check` function calls, modify the following:

```typescript
await tw.check('C1234', async () => {
    /* test for Case ID 1234 here */
});
```

specifying the TestRail Case ID being executed within the _check_ block. Any action that throws an _Error_ inside the _check_ block will result in a _Failed_ result for the test which is reported to TestRail as a _Retest_ result.

NOTE: to ensure Jasmine's _expect_ calls are properly understood by AFT, you must wrap them with AFT's `should(expect(actual).toBe(expected)).because('message reported on failure');`