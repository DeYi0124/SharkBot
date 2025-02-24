import { Regions } from '../../../constants';
import { BaseApiTft } from '../base/base.api.tft';
import { CurrentGameInfoTFTDTO } from '../../../models-dto/spectator/tft-spectator/current-game-info-tft.dto';
import { FeaturedGamesTFTDTO } from '../../../models-dto/spectator/tft-spectator/featured-games-tft.dto';
import { BaseApiGames } from '../../../base/base.const';
export declare class SpectatorTFTV5Api extends BaseApiTft {
    protected readonly game: BaseApiGames;
    /**
     * Get active games
     * @param puuid
     * @param region
     */
    activeGame(puuid: string, region: Regions): Promise<import("../../../models-dto").ApiResponseDTO<CurrentGameInfoTFTDTO>>;
    /**
     * Get featured games
     * @param region
     */
    featuredGames(region: Regions): Promise<import("../../../models-dto").ApiResponseDTO<FeaturedGamesTFTDTO>>;
}
