export class RegistrationForm {
  constructor(
    public user_id: string,
    public name: string,
    public description: string,
    public skill_id: string[],
    public github_id: string | null,
    public qiita_id: string | null,
    public x_id: string | null
  ) {}
}
