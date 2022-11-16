"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwitterService = void 0;
const common_1 = require("@nestjs/common");
const twitter_api_sdk_1 = require("twitter-api-sdk");
const mytwitter_oauth_strategy_1 = require("../../src/auth/twitter/mytwitter-oauth.strategy");
const user_service_1 = require("../../src/user/user.service");
require('dotenv').config();
const axios = require('axios');
let TwitterService = class TwitterService {
    constructor(twitter, user) {
        this.twitter = twitter;
        this.user = user;
        this.config = {
            method: "",
            url: 'https://api.twitter.com/2/tweets',
            headers: {
                'Authorization': 'OAuth oauth_consumer_key="30KPngBp7nZkK3fXsdZcroGEw",' +
                    '             oauth_token="1573419467941503000-d6hJgmVIjea4pKXDwfXcOzlZpr3Nmt",' +
                    '             oauth_signature_method="HMAC-SHA1",' +
                    '             oauth_timestamp="1665334080",' +
                    '             oauth_nonce="vqOZfFq91As",' +
                    '             oauth_version="1.0",' +
                    '             oauth_signature="9polVgNA%2Fimxv9xrS%2F%2BhUVqKNjw%3D"',
                'Content-Type': 'application/json',
                'Cookie': 'guest_id=v1%3A166400950912792038'
            },
            data: ""
        };
    }
    async tweet(area) {
        return this.user.findOne(area.owner.toString()).then(async (user) => {
            console.log('twitter refresh token = ', user.twitter.token);
            if (this.twitter.authClient.isAccessTokenExpired()) {
                console.log('access token expired, refreshing...');
                this.twitter.authClient.token = Object.assign(Object.assign({}, this.twitter.authClient.token), { refresh_token: user.twitter.token });
                this.twitter.authClient.refreshAccessToken()
                    .then((token) => {
                    this.twitter.authClient.token = Object.assign(Object.assign({}, this.twitter.authClient.token), { refresh_token: token.token.refresh_token });
                    this.user.update(area.owner.toString(), { twitter: { token: token.token.refresh_token } });
                    let client = new twitter_api_sdk_1.Client(this.twitter.authClient);
                    return client.tweets.createTweet({
                        text: new Date().toISOString() + ' : ' + area.reaction.data.message
                    }).then((res) => {
                        return res;
                    }).catch(console.error);
                }).catch(console.error);
            }
            else {
                console.log('access token up to date, let us go !');
                let client = new twitter_api_sdk_1.Client(this.twitter.authClient);
                return client.tweets.createTweet({
                    text: new Date().toISOString() + ' : ' + area.reaction.data.message
                }).then((res) => {
                    console.log('twitter response', res);
                    return res;
                }).catch(console.error);
            }
        });
    }
    async react(area) {
        console.log('in react twitter');
        if (area.reaction.id.name === "Twitter Tweet") {
            return this.tweet(area);
        }
        else
            return null;
    }
    async create(createTwitterDto) {
        this.config.method = "POST";
        this.config.data = JSON.stringify({ "text": createTwitterDto.message });
        const res = await axios(this.config);
        return { message: "well played", status: res.status };
    }
    async remove(id) {
        this.config.method = "DELETE";
        this.config.url = this.config.url + "/" + id;
        console.log("url: ", this.config.url);
        const res = axios(this.config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
            .catch(function (error) {
            console.log(error);
        });
        return res;
    }
};
TwitterService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => mytwitter_oauth_strategy_1.MyTwitterOauthStrategy))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mytwitter_oauth_strategy_1.MyTwitterOauthStrategy,
        user_service_1.UserService])
], TwitterService);
exports.TwitterService = TwitterService;
//# sourceMappingURL=twitter.service.js.map