const getUrl = () => {
  return process.env.NODE_ENV === 'development'
    ? 'http://192.168.50.83:3001'
    : process.env.API_URL;
};

export default getUrl;
