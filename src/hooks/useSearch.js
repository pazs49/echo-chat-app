import { useState, useEffect, useMemo } from "react";

const useSearch = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const search = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    // console.log(data, "data");
    // console.log(searchTerm, "searchTerm");
    let counter = 0;
    return data.filter(({ uid, id }) => {
      // return [uid, id].includes(searchTerm.toLowerCase());
      const joined = uid + " " + id;
      counter++;
      console.log(counter);
      return joined.includes(searchTerm.toLowerCase());
    });
  }, [searchTerm, data]);

  useEffect(() => {
    console.log(filteredData, "Filtered Data");
  }, [filteredData]);

  return { setData, searchTerm, filteredData, search, setSearchTerm };
};
export default useSearch;
