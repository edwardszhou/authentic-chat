export const apiRoutes = {
  auth: '/auth',
  authRefresh: '/auth/refresh',
  logout: '/auth/logout',
  users: '/users'
} as const;

export const appErrors = {
  mountError: 'Error mounting face detection; please try again later.',
  cameraError: 'Error accessing webcam. Please allow webcam permissions',
  faceHidden: 'Please makesure that your face is clearly visible to the camera!'
} as const;
