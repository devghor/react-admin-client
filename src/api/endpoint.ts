// Auth
export const AUTH_LOGIN = "/login";

// roles
export const ROLES_BROWSE = "/roles";
export const ROLES_POST = "/roles";
export const ROLES_PUT = (id) => `/roles/${id}`;
export const ROLES_DELETE= (id) => `/roles/${id}`;

// permissions 
export const PERMISSIONS_GET = "/permissions";
export const PERMISSIONS_POST = "/permissions";
export const PERMISSIONS_PUT = (id) => `/permissions/${id}`;
export const PERMISSIONS_DELETE= (id) => `/permissions/${id}`;

// users 
export const USERS_BROWSE = "/users";
export const USERS_READ = (id) => `/users/${id}`;
export const USERS_EDIT = (id) => `/users/${id}`;
export const USERS_APPEND = "/users";
export const USERS_DELETE = (id) => `/users/${id}`;

// dashboard
export const DASHBOARD_DETAILS = '/dashboard-details';
