import { useState, useEffect, useMemo } from "react";

const useSearch = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const search = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    console.log(data, "data");

    return data.filter(({ uid, id, name }) => {
      let joined;
      if (name) {
        console.log("ch");
        joined = name + " " + id;
      } else {
        joined = uid + " " + id;
      }
      return joined.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, data]);

  return { setData, searchTerm, filteredData, search, setSearchTerm };
};
export default useSearch;
