const BASEURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZDRlOGViOGM3NTVjYTM4ZDI4NzdiMzg1MDdlMzZkOSIsInN1YiI6IjY0ODIyYWM0YmYzMWYyMDEwMDMzYmVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.58otpSIEKudi35Wj6auvsvEKUEcCBTpaJQ-9sNHxAVE",
  },
};
const fetchData = async (url = "") => {
  const res = await fetch(BASEURL + url, options);
  const data = await res.json();

  return data;
};

export default fetchData;
