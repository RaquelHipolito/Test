# Coverage

## How to set up coverage

For the next steps, we assume you already have tests and coverage for your repository. If you don't have coverage and need help, take a look at our [article](generate-coverage.md) on how to generate coverage.

Repositories can be configured to show code coverage reports directly in Codacy. Codacy reads the source coverage reports, converts them to a smaller JSON file and uploads them, showing all results integrated into your [repository's dashboard](../repositories/repository-dashboard-overview.md).

## Project API Token

To set up coverage reporting you'll need a Project API token. You can find it in your repository settings 'Integrations' tab.

<img src="/images/Jun-06-2017_14-30-02.gif" width="650" />

### Token security

You should keep your API token well protected, as it grants owner permissions to your repositories. If you use CircleCI or Travis CI, you should use your token as an environment variable. **Don't put your keys in your configuration files**, check your service settings on how to set environment variables.

### Setting token as environment variable

```bash
export CODACY_PROJECT_TOKEN=%Project_Token%
```

(replacing %Project_Token% with your token)

## Setup

Check [here](https://github.com/codacy/codacy-coverage-reporter/blob/master/docs/index.md) for detailed instructions on how to set up the coverage reporter plugin.

## Submitting coverage for unsupported languages or tools

If your language or build tool isn't supported yet, you can send the coverage data directly through the Codacy API. You can check the endpoint in the [API documentation](https://api.codacy.com/swagger#savecoverage) and an example of the JSON payload below.

```json
{
  "total": 23,
  "fileReports": [
    {
      "filename": "src/Codacy/Coverage/Parser/CloverParser.php",
      "total": 54,
      "coverage": {
        "3": 3,
        "5": 0,
        "7": 1
      }
    }
  ]
}
```

!!! note
In case the token was retrieved from the Repository integrations tab, the header should be `project-token`. If it is an account token, the header should be `api-token` and you must call [this API method](https://api.codacy.com/swagger#savecoveragewithprojectname) instead.

Also, note all _coverable_ lines should be present on the "coverage" variable of the JSON payload. In the example, you can see that "5": 0, meaning that line 5 is not covered.

## See also

-   [Add Coverage to your repo](add-coverage-to-your-repo.md)
-   [Generate Coverage](generate-coverage.md)