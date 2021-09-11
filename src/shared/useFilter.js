import React from "react";

const filterData = ({ searchItem, dataset = [], searchCriteria }) => {
  let result = [];
  result = dataset.filter(
    (data) => data[searchCriteria].search(searchItem) !== -1
  );
  return result;
};

const useFilter = ({ searchItem, dataset = [], searchCriteria }) => {
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
  }, [dataset.length]);

  return filteredData;
};

export default useFilter;
