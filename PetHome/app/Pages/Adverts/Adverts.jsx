import React, { useState, useEffect } from "react";
import AdvertService from "../../HTTP/API/AdvertService";
import { FlatList, View, Text, Dimensions } from "react-native";
import useFetching from "../../Hooks/useFetching";
import Loader from "../../Components/Loader/Loader";
import AdvertItem from "../../Components/Adverts/AdvertItem/AdvertItem";
import Filters from "../../Components/Adverts/Filters/Filters";
import MyModal from "../../Components/MyModal/MyModal";
import UserAdvertItem from "../../Components/Adverts/UserAdvertItem/UserAdvertItem";
import UserDataService from "../../HTTP/API/UserDataService";
import { observer } from "mobx-react-lite";
import useStore from "../../Hooks/useAuth";
import AdvertsStyles from "./AdvertsStyles";

const Adverts = ({ navigation, route }) => {
  const store = useStore()
  const { isUserAdverts } = route.params
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [adverts, setAdverts] = useState([]);
  const [queryParams, setQueryParams] = useState({
    advertsLimit: 10,
    currentPage: 1,
    isDatesFit: false,
    costFrom: 1,
    costTo: 10000,
    advertsStatus: 'search'
  })

  const [fetchAdverts, loader, error] = useFetching(async function () {
    let response = []
    if (isUserAdverts) {
      response = await UserDataService.getUserAdverts(queryParams)
    } else {
      response = await AdvertService.getAllAdverts(queryParams);
    }
    setAdverts(response.data);
  });

  async function fetchData() {
    try {
      await fetchAdverts()
    } catch (e) {
      setIsModalVisible(true)
    }
  }

  useEffect(() => {
    fetchData();
  }, [queryParams, store.advertsNeedUpdate]);

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = 190;
  const itemMargin = 5;
  const numColumns = Math.floor(screenWidth / (itemWidth + itemMargin * 2));
  if (loader) return <Loader />

  const modal = isModalVisible && <MyModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} content={<Text>{error}</Text>}></MyModal>

  return (
    <View >
      <View style={AdvertsStyles.filtersContainer}>
        <Filters isUserAdverts={isUserAdverts} queryParams={queryParams} setQueryParams={setQueryParams}></Filters>

      </View>
      {modal}
      {adverts.length > 0
        ? (
          <View>
            <FlatList
              horizontal={false}
              numColumns={numColumns}
              data={adverts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (isUserAdverts
                ? <UserAdvertItem item={item} navigation={navigation} />
                : <AdvertItem item={item} navigation={navigation} />
              )}
            />
          </View>

        )
        : (
          <Text >Поки немає оголошень</Text>
        )}
    </View>
  );
};

export default observer(Adverts);
