/*
fetch-types - ClientFetchOptions - extra authRequired parameter added to fetch
*/

export interface ClientFetchOptions extends RequestInit {
  authRequired?: boolean;
}