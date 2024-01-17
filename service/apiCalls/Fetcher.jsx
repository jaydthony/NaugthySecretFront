import axios from "axios";
import { useState, useEffect } from "react";
export const fetcher = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const useDataFetching = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);
  return { data, error };
};
// Function to make a POST request using Axios
export const fetchData = async (url, auth) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: auth,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateData = async (url, data) => {
  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postData = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postForgotData = async (url) => {
  try {
    const response = await axios.post(url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const postDataAuth = async (url, data, auth) => {
  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: auth,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const patchDataAuth = async (url, data, auth) => {
  try {
    const response = await axios.patch(url, data, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: auth,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const patchUserDataAuth = async (url, auth) => {
  try {
    const response = await axios.patch(url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: auth,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (url, auth) => {
  try {
    const response = await axios.delete(url, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: auth,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
