var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var axios = require('axios')["default"];
var Service = /** @class */ (function () {
    function Service(name, logo) {
        this.name = name;
        this.logo = logo;
    }
    return Service;
}());
var Action = /** @class */ (function () {
    function Action(name, description, service, dataScheme) {
        this.name = name;
        this.description = description;
        this.service = service;
        this.dataScheme = dataScheme;
    }
    return Action;
}());
var Reaction = /** @class */ (function () {
    function Reaction(name, description, service, dataScheme) {
        this.name = name;
        this.description = description;
        this.service = service;
        this.dataScheme = dataScheme;
    }
    return Reaction;
}());
var url = 'http://localhost:8080/';
var admin_token = "B8HUTQAESO5W9CMVTRYJ";
function registerService(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.post(url + 'services', data, { headers: { token: admin_token } })["catch"](function (err) { console.error(err); return null; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function registerAction(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.post(url + 'actions', data, { headers: { token: admin_token } })["catch"](function (err) { console.error(err); return null; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function registerReaction(data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios.post(url + 'reactions', data, { headers: { token: admin_token } })["catch"](function (err) { console.error(err); return null; })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function servTwitter() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            registerService(new Service("Twitter", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4n_urpJ9XpwOTdzBVbGvactwHrPagYQrTJPYjxfxLGkSyu7nJZVqRVGAeohnPgKMrnKE&usqp=CAU"))
                .then(function (res) {
                registerReaction(new Reaction("Twitter Tweet", "Effectue un tweet sur Twitter", res.data._id, {
                    username: {
                        type: "string",
                        description: "Le nom d'utilisateur de l'auteur du tweet"
                    },
                    message: {
                        type: "string",
                        description: "Le contenu du tweet"
                    }
                }));
            });
            return [2 /*return*/];
        });
    });
}
function servGmail() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            registerService(new Service("Gmail", "https://cdn-icons-png.flaticon.com/512/281/281769.png"))
                .then(function (res) {
                registerReaction(new Reaction("Gmail Mail", "Envoie un mail via Gmail", res.data._id, {
                    email: {
                        type: "string",
                        description: "L'adresse qui recevra le mail"
                    },
                    objet: {
                        type: "string",
                        description: "L'objet du mail"
                    },
                    message: {
                        type: "string",
                        description: "Le contenu du mail"
                    }
                }));
            });
            return [2 /*return*/];
        });
    });
}
function servCalendar() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            registerService(new Service("Calendar", "https://cdn.icon-icons.com/icons2/2631/PNG/512/google_calendar_new_logo_icon_159141.png"))
                .then(function (res) {
                registerReaction(new Reaction("Calendar Event", "Cr??er un Event via Calendar", res.data._id, {
                    summary: {
                        type: "string",
                        description: "Le titre de l'??venement"
                    },
                    description: {
                        type: "string",
                        description: "La description de l'??venement"
                    },
                    location: {
                        type: "string",
                        description: "Le lieu de l'??venement"
                    },
                    startDate: {
                        type: "date",
                        description: "la date du jour, heure et minute du d??but de l'event"
                    },
                    endDate: {
                        type: "date",
                        description: "la date du jour, heure et minute de la fin de l'event"
                    }
                }));
            });
            return [2 /*return*/];
        });
    });
}
function servYoutube() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            registerService(new Service("Youtube", "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/YouTube_social_white_squircle.svg/2048px-YouTube_social_white_squircle.svg.png"))
                .then(function (res) {
                registerReaction(new Reaction("Youtube Upload Video", "Upload une video via Youtube", res.data._id, {
                    title: {
                        type: "string",
                        description: "Le titre de la video"
                    },
                    description: {
                        type: "string",
                        description: "La description de la video"
                    },
                    privacyStatus: {
                        type: "choice",
                        description: "La visibilit?? de la video",
                        choices: [
                            { name: "publique", value: false },
                            { name: "priv??e", value: true }
                        ]
                    }
                }));
            });
            return [2 /*return*/];
        });
    });
}
function servSMS() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            registerService(new Service("SMS", "https://thumbs.dreamstime.com/b/ic-ne-de-causerie-sms-bulle-commentaires-communication-d-entretien-appel-groupe-bulles-la-parole-les-que-commente-des-dirigent-l-148080907.jpg"))
                .then(function (res) {
                registerReaction(new Reaction("Send SMS", "Envoyer un message via SMS", res.data._id, {
                    to: {
                        type: "string",
                        description: "Le num??ro de la personne ?? qui envoyer"
                    },
                    message: {
                        type: "string",
                        description: "Le message a envoyer"
                    }
                }));
            });
            return [2 /*return*/];
        });
    });
}
function servTelegram() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            registerService(new Service("Telegram", "https://seeklogo.com/images/T/telegram-logo-6E3A371CF2-seeklogo.com.png"))
                .then(function (res) {
                registerReaction(new Reaction("Send SMS", "Envoyer un message dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    message: {
                        type: "string",
                        description: "Le message a envoyer"
                    }
                }));
                registerReaction(new Reaction("Send Animation", "Envoyer un du GIF dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    animation: {
                        type: "string",
                        description: "Le lien du GIF"
                    }
                }));
                registerReaction(new Reaction("Send Photo", "Envoyer une photo dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    photo: {
                        type: "string",
                        description: "Le lien de la photo"
                    }
                }));
                registerReaction(new Reaction("Send Document", "Envoyer un document dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    document: {
                        type: "string",
                        description: "Le lien du document"
                    }
                }));
                registerReaction(new Reaction("Send Video", "Envoyer une video dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    video: {
                        type: "string",
                        description: "Le lien de la video"
                    }
                }));
                registerReaction(new Reaction("Set Chat Photo", "set une photo dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    photo: {
                        type: "string",
                        description: "Le lien de la photo"
                    }
                }));
                registerReaction(new Reaction("Set Chat Title", "set un titre dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    title: {
                        type: "string",
                        description: "Le titre du groupe"
                    }
                }));
                registerReaction(new Reaction("Set Chat Description", "set une description dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    description: {
                        type: "string",
                        description: "La description du groupe"
                    }
                }));
                registerReaction(new Reaction("Set Chat Sticker Set", "set un sticket set dans un groupe via un Bot Telegram", res.data._id, {
                    groupeId: {
                        type: "string",
                        description: "L'id du groupe telegram"
                    },
                    stickerSetName: {
                        type: "string",
                        description: "Le nom du sticker set"
                    }
                }));
            });
            return [2 /*return*/];
        });
    });
}
function servDiscord() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            registerService(new Service("Discord", "https://upload.wikimedia.org/wikipedia/fr/thumb/4/4f/Discord_Logo_sans_texte.svg/1818px-Discord_Logo_sans_texte.svg.png"))
                .then(function (res) {
                registerReaction(new Reaction("Discord ChannelMsg", "Envoie un message sur un channel Discord", res.data._id, {
                    channel: {
                        type: "choice",
                        description: "un choix s??lectif entre tous les channel Discord de vos serveurs sous la forme <nom du serveur>#<nom du channel> E.G AREA#g??n??ral",
                        choices: []
                    },
                    message: {
                        type: "string",
                        description: "Le contenu du message"
                    }
                }));
            });
            return [2 /*return*/];
        });
    });
}
function servGithub() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            registerService(new Service("Github", "https://cdn-icons-png.flaticon.com/512/25/25231.png")).then(function (res) {
                registerAction(new Action("Github Push", "Un push ?? ??t?? effectu??", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t cibl?? par le push"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t cibl?? par le push"
                    }
                }));
                registerAction(new Action("Github Star", "Une ??toile ?? ??t?? ajout??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t cibl?? par l'??toile"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t cibl?? par l'??toile"
                    }
                }));
                registerAction(new Action("Github Unstar", "Une ??toile ?? ??t?? enlev??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t cibl?? par l'??toile"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t cibl?? par l'??toile"
                    }
                }));
                registerAction(new Action("Github Fork", "Un fork ?? ??t?? cr????", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t fork??"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t fork??"
                    }
                }));
                registerAction(new Action("Github CreateBranch", "Une branche ?? ??t?? cr????e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? la branche est cr????e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? la branche est cr????e"
                    }
                }));
                registerAction(new Action("Github CreateTag", "Un tag ?? ??t?? cr????", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? le tag est cr????"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? le tag est cr????"
                    }
                }));
                registerAction(new Action("Github OpenIssue", "Une issue ?? ??t?? ouverte", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est ouverte"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est ouverte'"
                    }
                }));
                registerAction(new Action("Github CloseIssue", "Une issue ?? ??t?? ferm??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est ferm??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est ferm??e'"
                    }
                }));
                registerAction(new Action("Github EditIssue", "Une issue ?? ??t?? modifi??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est modifi??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est modifi??e"
                    }
                }));
                registerAction(new Action("Github DeleteIssue", "Une issue ?? ??t?? effac??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est effac??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est effac??e"
                    }
                }));
                registerAction(new Action("Github AssignIssue", "Une issue ?? ??t?? assign??e ?? un utilisateur", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est assign??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est assign??e"
                    }
                }));
                registerAction(new Action("Github UnassignIssue", "Une issue ?? ??t?? desassign??e d'un utilisateur", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est desassign??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est desassign??e"
                    }
                }));
                registerAction(new Action("Github PinIssue", "Une issue ?? ??t?? ??pingl??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est ??pingl??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est ??pingl??e"
                    }
                }));
                registerAction(new Action("Github UnpinIssue", "Une issue ?? ??t?? des??pingl??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est des??pingl??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est des??pingl??e"
                    }
                }));
                registerAction(new Action("Github LockIssue", "Une issue ?? ??t?? verouill??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est verouill??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est verouill??e"
                    }
                }));
                registerAction(new Action("Github UnlockIssue", "Une issue ?? ??t?? deverouill??e", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est deverouill??e"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est deverouill??e"
                    }
                }));
                registerAction(new Action("Github ReopenIssue", "Une issue ?? ??t?? r??ouverte", res.data._id, {
                    owner: {
                        type: "string",
                        description: "Le propri??taire du d??p??t o?? l'issue est r??ouverte"
                    },
                    repository: {
                        type: "string",
                        description: "Le d??p??t o?? l'issue est r??ouverte"
                    }
                }));
            });
            return [2 /*return*/];
        });
    });
}
axios["delete"](url + 'services/all', { headers: { token: admin_token } }).then(function (res) {
    servTwitter();
    servGithub();
    servGmail();
    servCalendar();
    servYoutube();
    servSMS();
    servTelegram();
    servDiscord();
});
