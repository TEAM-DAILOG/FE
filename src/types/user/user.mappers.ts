import type { UpdateMeParams } from "./user.types";

export function createUpdateMeFormData(params: UpdateMeParams) {
  const formData = new FormData();

  formData.append("name", params.name);
  formData.append("email", params.email);

  if (params.profileImage) {
    formData.append("profileImage", params.profileImage as unknown as Blob);
  }

  return formData;
}
