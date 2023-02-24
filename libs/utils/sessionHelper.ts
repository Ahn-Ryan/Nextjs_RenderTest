import jsCookies from 'js-cookie';

export function addUserAccessToken(isMultiPart: boolean | undefined = false) {
  const headers: any = {};
  const access = jsCookies.get('access');
  if (access) {
    headers.Authorization = `JWT ${access}`;
  }
  if (isMultiPart) {
    headers['Content-Type'] = 'multipart/form-data';
  } else {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
}
