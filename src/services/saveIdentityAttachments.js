/* eslint-disable no-undef */

export default async function (user, fData) {
  const response = await fetch(`${user.baseUrl}/MyProfile/SaveIdentityAttachments`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;'
    },
    body: fData,
  });
  const responseJson = await response.json();
  return responseJson;
}
