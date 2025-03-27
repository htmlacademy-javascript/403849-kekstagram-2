const fetchApi = (url, request = {}) => fetch(url, request)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error();
  });

export {fetchApi};
