import { Resolver, Query, Args, Int } from "@nestjs/graphql";
import { SearchService } from "./search.service";

@Resolver()
export class SearchResolver {
  constructor(private readonly searchService: SearchService) {}

  @Query("searchMulti")
  async searchMulti(
    @Args("query") query: string,
    @Args("page", { type: () => Int, nullable: true }) page?: number,
  ) {
    return this.searchService.searchMulti(query, page ?? 1);
  }
}
