export interface ITokenUtils {
  GenerateTokens(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }>;
}
