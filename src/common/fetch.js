import { AUTH_STATUS, authStore } from 'login/hooks/useAuthStore';
import { toast } from 'react-toastify';

const BluetailAPI = async (url, options) => {
  // In development mode, fallback on the proxy defined in package.json until BOOM has a proper CORS policy
  const domain = process.env.REACT_APP_API_DOMAIN;

  if (!options.external) {
    return fetch(`${domain}${url}`, options);
  }

  // External API, remove domain and credentials

  // eslint-disable-next-line no-param-reassign
  delete options.credentials;
  return fetch(url, options);
};

const getApi = async (url, opts = {}) => {
  let response;
  let data;

  const fullOpts = {
    method: 'GET',
    ...opts,
  };

  try {
    response = await BluetailAPI(url, fullOpts);
    if (fullOpts.responseHandler) {
      data = await fullOpts.responseHandler(response);
    } else {
      data = await response.json();
    }

    if (!response.ok && fullOpts.ignoreOkCheck !== true) {
      if (response.status === 401) {
        const { setAuthState } = authStore;

        setAuthState(AUTH_STATUS.LOGGED_OUT);
        toast.error('Session has expired, please log in again!');
      }

      // eslint-disable-next-line no-throw-literal
      throw ({
        error: 'Response not ok',
        response,
        data
      });
    }

    if (fullOpts.dataFormatter) {
      data = fullOpts.dataFormatter(data);
    }

    return {
      error: null,
      response,
      data,
    };
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw ({
      error,
      response,
      data,
    });
  }
};

const mutateApi = async (url, method, body, opts = {}) => {
  const { headers, ...otherOpts } = opts;
  const defaultHeaders = {};
  let response;
  let data;
  let bodyToUse = body;

  // If we are making a JSON request, apply some defaults, as this will be 90% of our requests.
  if (!opts.noJSON) {
    bodyToUse = JSON.stringify(body);
    defaultHeaders['Content-Type'] = 'application/json';
  }

  try {
    response = await BluetailAPI(url, {
      method,
      body: bodyToUse,
      credentials: 'include',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...otherOpts,
    });

    try {
      data = await response.json();
    } catch {
      // No body to read, continue on
      data = response;
    }
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw ({
      error,
      response,
      data
    });
  }

  if (!response.ok && opts.ignoreOkCheck !== true) {
    // eslint-disable-next-line no-throw-literal
    throw ({
      response,
      data
    });
  }

  return {
    error: null,
    response,
    data,
  };
};

const postApi = async (url, body, opts = {}) => mutateApi(url, 'POST', body, opts);
const putApi = async (url, body, opts = {}) => mutateApi(url, 'PUT', body, opts);
const patchApi = async (url, body, opts = {}) => mutateApi(url, 'PATCH', body, opts);
const deleteApi = async (url, body, opts = {}) => mutateApi(url, 'DELETE', body, opts);

export {
  getApi, postApi, putApi, deleteApi, patchApi,
};
