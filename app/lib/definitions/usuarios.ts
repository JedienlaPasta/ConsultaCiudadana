export type TeamMember = {
  user_hash: string;
  name: string;
  user_role: string;
  survey_access?: string;

  username?: string;
  isYou?: boolean;
};
