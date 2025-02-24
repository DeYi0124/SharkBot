import { BaseApiTft } from './base/base.api.tft';
import { MatchTFTApi } from './match/match.tft';
import { SummonerTftApi } from './summoner/summoner';
import { TFTStaticFiles } from './static/static';
import { LeagueTFTApi } from './league/league.tft';
import { SpectatorTFTV5Api } from './spectator/spectator-v5.tft';
/**
 * TFT Api
 */
export declare class TftApi extends BaseApiTft {
    /**
     * Match methods
     */
    readonly Match: MatchTFTApi;
    /**
     * Summoner methods
     */
    readonly Summoner: SummonerTftApi;
    /**
     * League methods
     */
    readonly League: LeagueTFTApi;
    /**
     * Spectator methods
     */
    readonly SpectatorV5: SpectatorTFTV5Api;
    /**
     * Static files
     */
    readonly StaticFiles: TFTStaticFiles;
}
