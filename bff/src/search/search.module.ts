import { Module } from "@nestjs/common";
import { SearchResolver } from "./search.resolver";
import { SearchService } from "./search.service";
import { TmdbModule } from "../tmdb/tmdb.module";

@Module({
  imports: [TmdbModule],
  providers: [SearchResolver, SearchService],
})
export class SearchModule {}
