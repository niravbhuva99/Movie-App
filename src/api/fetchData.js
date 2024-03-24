const BASEURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization: process.env.REACT_APP_AUTH,
  },
};
const fetchData = async (url = "") => {
  const res = await fetch(BASEURL + url, options);
  const data = await res.json();

  return data;
};

export default fetchData;

const hello = () => {
  console.log("hello");
};

hello();
