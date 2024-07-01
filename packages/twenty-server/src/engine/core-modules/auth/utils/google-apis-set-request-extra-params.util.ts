import { GoogleAPIsRequest } from 'src/engine/core-modules/auth/types/google-api-request.type';

type GoogleAPIsRequestExtraParams = {
  transientToken?: string;
  redirectLocation?: string;
  calendarVisibility?: string;
  messageVisibility?: string;
};

export const setRequestExtraParams = (
  request: GoogleAPIsRequest,
  params: GoogleAPIsRequestExtraParams,
): void => {
  const {
    transientToken,
    redirectLocation,
    calendarVisibility,
    messageVisibility,
  } = params;

  if (!transientToken) {
    throw new Error('transientToken is required');
  }

  request.params.transientToken = transientToken;

  if (redirectLocation) {
    request.params.redirectLocation = redirectLocation;
  }

  if (calendarVisibility) {
    request.params.calendarVisibility = calendarVisibility;
  }

  if (messageVisibility) {
    request.params.messageVisibility = messageVisibility;
  }
};
