import { Injectable } from "@nestjs/common";
import { TmdbService } from "../tmdb/tmdb.service";
import { TmdbSearchResult } from "../tmdb/tmdb.types";
import {
  type SearchResult,
  type MediaItem,
  MediaType,
} from "../generated/graphql";

@Injectable()
export class SearchService {
  constructor(private readonly tmdbService: TmdbService) {}

  async searchMulti(query: string, page = 1): Promise<SearchResult> {
    const data = await this.tmdbService.searchMulti(query, page);

    const results = data.results
      .filter(
        (item): item is TmdbSearchResult & { media_type: "movie" | "tv" } =>
          item.media_type === "movie" || item.media_type === "tv",
      )
      .map((item) => this.mapToMediaItem(item));

    return {
      page: data.page,
      totalPages: data.total_pages,
      totalResults: data.total_results,
      results,
    };
  }

  private mapToMediaItem(
    item: TmdbSearchResult & { media_type: "movie" | "tv" },
  ): MediaItem {
    return {
      id: item.id,
      title: item.media_type === "movie" ? (item.title ?? "") : (item.name ?? ""),
      mediaType: item.media_type === "movie" ? MediaType.Movie : MediaType.Tv,
      posterPath: item.poster_path,
      releaseDate:
        item.media_type === "movie"
          ? (item.release_date ?? null)
          : (item.first_air_date ?? null),
      voteAverage: item.vote_average,
      overview: item.overview,
    };
  }
}
