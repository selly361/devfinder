export interface GitHubUser {
  avatar_url: string
  name: string | null
  login: string
  created_at: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  location: string | null
  twitter_username: string | null
  blog: string | null
  company: string | null
}