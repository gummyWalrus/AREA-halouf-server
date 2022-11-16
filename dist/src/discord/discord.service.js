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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscordService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const discord_strategy_1 = require("../../src/auth/discord/discord-strategy");
const config_1 = require("@nestjs/config");
const GUILD_TEXT = 0;
const GUILD_CATEGORY = 4;
let DiscordService = class DiscordService {
    constructor(http, discordStrategy, config) {
        this.http = http;
        this.discordStrategy = discordStrategy;
        this.config = config;
    }
    async getChannels(user_id) {
        var result = [];
        let accessToken = await this.discordStrategy.refreshAccessToken(user_id);
        return this.http.axiosRef.get('https://discord.com/api/users/@me/guilds', { headers: { 'Authorization': 'Bearer ' + accessToken } })
            .then(async (res) => {
            const guilds = res.data;
            var botGuilds = [];
            for (const guild of guilds) {
                const members = await this.http.axiosRef.get(`https://discord.com/api/guilds/${guild.id}/members?limit=1000`, { headers: { 'Authorization': 'Bot ' + this.config.get('DISCORD_BOT_TOKEN') } }).then(res => { return res; }).catch((err) => {
                    return { data: [] };
                });
                for (const member of members.data) {
                    if (member.user.bot && member.user.id === this.config.get('DISCORD_BOT_ID')) {
                        botGuilds.push(guild);
                        break;
                    }
                }
            }
            for (const guild of botGuilds) {
                let categories = [];
                let infantChannels = [];
                const channels = await this.http.axiosRef.get(`https://discord.com/api/guilds/${guild.id}/channels`, { headers: { 'Authorization': 'Bot ' + this.config.get('DISCORD_BOT_TOKEN') } });
                for (const channel of channels.data) {
                    if (channel.type === GUILD_TEXT && channel.parent_id === channel.guild_id)
                        result.push({ name: `${guild.name}#${channel.name}`, value: channel.id });
                    else if (channel.type === GUILD_CATEGORY)
                        categories.push(channel);
                    else if (channel.parent_id !== channel.guild_id)
                        infantChannels.push(channel);
                }
                for (const channel of infantChannels) {
                    for (const category of categories) {
                        if (category.id === channel.parent_id && channel.type === GUILD_TEXT) {
                            result.push({ name: `${guild.name}#${category.name}/${channel.name}`, value: channel.id });
                            break;
                        }
                    }
                }
            }
            return result;
        }).catch(console.error);
    }
    async sendChannelMsg(area, accessToken) {
        this.http.axiosRef.post(`https://discord.com/api/channels/${area.reaction.data.channel}/messages`, { content: area.reaction.data.message }, { headers: { Authorization: "Bot " + this.config.get('DISCORD_BOT_TOKEN') } }).catch(console.error);
    }
    async react(area) {
        let accessToken = await this.discordStrategy.refreshAccessToken(area.owner.toString());
        if (area.reaction.id.name === "Discord ChannelMsg")
            this.sendChannelMsg(area, accessToken).catch(console.error);
    }
};
DiscordService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        discord_strategy_1.DiscordStrategy,
        config_1.ConfigService])
], DiscordService);
exports.DiscordService = DiscordService;
//# sourceMappingURL=discord.service.js.map