"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpectatorTFTV5Api = void 0;
const base_api_tft_1 = require("../base/base.api.tft");
const endpoints_1 = require("../../../endpoints");
const base_const_1 = require("../../../base/base.const");
class SpectatorTFTV5Api extends base_api_tft_1.BaseApiTft {
    constructor() {
        super(...arguments);
        this.game = base_const_1.BaseApiGames.LOL;
    }
    /**
     * Get active games
     * @param puuid
     * @param region
     */
    activeGame(puuid, region) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                encryptedPUUID: puuid
            };
            return this.request(region, endpoints_1.endpointsTFTV5.SpectateSummoner, params);
        });
    }
    /**
     * Get featured games
     * @param region
     */
    featuredGames(region) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(region, endpoints_1.endpointsTFTV5.SpectatorFeaturedGames);
        });
    }
}
exports.SpectatorTFTV5Api = SpectatorTFTV5Api;
