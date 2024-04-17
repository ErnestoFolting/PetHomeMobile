import React, { useState, useEffect } from "react";
import AdvertService from "../../HTTP/API/AdvertService";
import { FlatList, View, Image, Text, Button, Dimensions } from "react-native";
import useFetching from "../../Hooks/useFetching";
import Loader from "../../Components/Loader/Loader";
import AdvertItem from "../../Components/Adverts/AdvertItem/AdvertItem";
import Filters from "../../Components/Adverts/Filters/Filters";

const Adverts = ({ navigation }) => {
  const [adverts, setAdverts] = useState([]);
  const [queryParams, setQueryParams] = useState({
    advertsLimit: 10,
    currentPage: 1,
    isDatesFit: false,
    costFrom: 1,
    costTo: 100000
  })

  const [fetchAdverts, loader, error] = useFetching(async function () {
    const response = await AdvertService.getAllAdverts(queryParams);
    setAdverts(response.data);
  });

  useEffect(() => {
    async function fetchData() {
      try {
        await fetchAdverts();
      } catch (e) {
        console.error(e?.message);
      }
    }
    fetchData();
  }, [queryParams]);

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = 190;
  const itemMargin = 5;
  const numColumns = Math.floor(screenWidth / (itemWidth + itemMargin * 2));
  if (loader) return <Loader />

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      {adverts.length > 0
        ? (
          <View>
            <Filters></Filters>
            <FlatList
              horizontal={false}
              numColumns={numColumns}
              data={adverts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <AdvertItem item={item} navigation={navigation}></AdvertItem>
              )}
            />
          </View>

        )
        : (
          <Text>Поки немає оголошень</Text>
        )}
    </View>
  );
};

export default Adverts;
