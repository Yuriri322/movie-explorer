import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { AxiosError } from "axios";
import { firstValueFrom } from "rxjs";
import { TmdbSearchResponse } from "./tmdb.types";

@Injectable()
export class TmdbService {
  private readonly baseUrl = "https://api.themoviedb.org/3";
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const key = this.configService.get<string>("TMDB_API_KEY");
    if (!key) {
      throw new Error("TMDB_API_KEY environment variable is required");
    }
    this.apiKey = key;
  }

  async searchMulti(query: string, page = 1): Promise<TmdbSearchResponse> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<TmdbSearchResponse>(
          `${this.baseUrl}/search/multi`,
          {
            params: { query, page },
            headers: {
              Authorization: `Bearer ${this.apiKey}`,
              Accept: "application/json",
            },
          },
        ),
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
        const message = error.response?.data?.status_message ?? "Failed to fetch from TMDB";
        throw new HttpException(message, status);
      }
      throw new HttpException("Failed to fetch from TMDB", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
