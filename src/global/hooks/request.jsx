import axios from "axios";
import { useEffect, useState } from "react";

const useRequest = (
  {
    path = "",
    method = "get",
    body = undefined,
    size = undefined,
    page = undefined,
  },
  initiateRequestOnLoad = false,
  initData = null,
  onError
) => {
  const [loading, setLoading] = useState(initiateRequestOnLoad);
  const [data, setData] = useState(initData);
  const [error, SetError] = useState(null);
  const [status, setStatus] = useState(-1);

  const makeRequest = async (
    body = undefined,
    size = undefined,
    page = undefined
  ) => {
    try {
      setLoading(true);
      const response = await axios[method](
        size && page ? `${path}?size=${size}&page=${page}` : path,
        body
      );

      setStatus(response.status);

      if (response.status === 200 || response.status === 201) {
        setData(response.data);
      }
      setLoading(false);
    } catch (error) {
      setStatus(error.response.status);
      setLoading(false);
      SetError(error);
      onError && onError(error);
    }
  };

  useEffect(() => {
    if (initiateRequestOnLoad) {
      makeRequest(body, size, page);
    }
  }, []);

  return {
    data,
    loading,
    error,
    makeRequest,
    status,
  };
};

export const useLoginRequest = () => {
  const { makeRequest: login, status: loginResponseStatus } = useRequest({
    method: "post",
    path: `${process.env.REACT_APP_API_URL}/v1/users/login`,
  });

  return { login, loginResponseStatus };
};

export const useSignupRequest = () => {
  const { makeRequest: signup, status: signupResponseStatus } = useRequest({
    path: `${process.env.REACT_APP_API_URL}/v1/users`,
    method: "post",
  });

  return { signup, signupResponseStatus };
};

export const useLogoutRequest = () => {
  const { makeRequest: logout, status: logoutResponseStatus } = useRequest({
    method: "get",
    path: `${process.env.REACT_APP_API_URL}/v1/users/logout`,
  });

  return { logout, logoutResponseStatus };
};

export const useGetAllOperationsRequest = (onError) => {
  const { data: operations, loading } = useRequest(
    { method: "get", path: `${process.env.REACT_APP_API_URL}/v1/operations` },
    true,
    [],
    onError
  );

  return { operations, loading };
};

export const useCreateRecord = (onError) => {
  const {
    makeRequest: createRecord,
    status: createRecordResponseStatus,
    loading: createRecordLoading,
    data: record,
  } = useRequest(
    { method: "post", path: `${process.env.REACT_APP_API_URL}/v1/records` },
    false,
    null,
    onError
  );

  return {
    createRecord,
    createRecordLoading,
    createRecordResponseStatus,
    record,
  };
};

export const useGetAllRecordsRequest = (size, page, onError) => {
  const { data: recordsData, makeRequest: getAllRecords } = useRequest(
    {
      method: "get",
      path: `${process.env.REACT_APP_API_URL}/v1/records`,
      size,
      page,
    },
    true,
    { records: [] },
    onError
  );

  return {
    records: recordsData.records,
    getAllRecords,
  };
};
