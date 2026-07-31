export interface GetMeResponse {
  userId: number;
  email: string;
  name: string;
  profileImageUrl: string | null;
}

export interface UpdateMeParams {
  name: string;
  email: string;
  profileImage?: {
    uri: string;
    name: string;
    type: string;
  } | null;
}

export type UpdateMeResponse = GetMeResponse;
