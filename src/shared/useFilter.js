import React from "react";

const filterData = ({ searchItem, dataset, searchCriteria }) => {
  let result = [];
  result = dataset.filter(
    (data) => data[searchCriteria].search(searchItem) !== -1
  );
  return result;
};

const useFilter = ({ searchItem, dataset, searchCriteria }) => {
  console.log("about to usefilter");
  const [filteredData, setFilteredData] = React.useState();

  React.useEffect(() => {
    setFilteredData(
      filterData({
        searchItem,
        dataset,
        searchCriteria,
      })
    );
  }, [searchItem]);

  React.useEffect(() => {
    setFilteredData(dataset);
  }, [dataset]);
  console.log("about to useFilter !!! ", filteredData);
  return filteredData;
};

export default useFilter;
