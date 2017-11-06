const travisPing = require("travis-ping");

const repos = [
    "unitejs-test/angular-javascript",
    "unitejs-test/angular-typescript",
    "unitejs-test/aurelia-javascript",
    "unitejs-test/aurelia-typescript",
    "unitejs-test/plainapp-javascript",
    "unitejs-test/plainapp-typescript",
    "unitejs-test/polymer-javascript",
    "unitejs-test/polymer-typescript",
    "unitejs-test/preact-javascript",
    "unitejs-test/preact-typescript",
    "unitejs-test/react-javascript",
    "unitejs-test/react-typescript",
    "unitejs-test/vue-javascript",
    "unitejs-test/vue-typescript"
];

let repoCounter = 0;
const pingRepo = (index) => {
    console.log("Pinging", repos[repoCounter]);
    travisPing.ping(
        { github_token: process.env.GITHUB_ACCESS_TOKEN },
        repos[repoCounter],
        { branch: 'master' },
        (travisResponse) => {
            if (travisResponse) {
                console.log(JSON.stringify(travisResponse))
            } else {
                console.log("Completed Successfully");
            }
            repoCounter++;
            if (repoCounter < repos.length) {
                setTimeout(() => pingRepo(repoCounter), 10000);
            }
        }
    )
};
pingRepo(repoCounter);