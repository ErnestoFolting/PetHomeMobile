import React, { useState, useEffect } from "react";
import AdvertService from "../../HTTP/API/AdvertService";
import { FlatList, View, Image, Text, Button } from "react-native";
import useFetching from "../../Hooks/useFetching";
import useAuth from "../../Hooks/useAuth";
import Colors from "../../Constants/Colors";

const Adverts = () => {
  const [adverts, setAdverts] = useState([]);
  const [check, setCheck] = useState(false);
  const [queryParams, setQueryParams] = useState({
    advertsLimit: 6,
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
  }, [queryParams, check]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>

      {adverts.length > 0
        ? (
          <FlatList
            data={adverts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ marginBottom: 20 }}>
                <Image
                  source={{
                    uri:
                      process.env.EXPO_PUBLIC_API_URL +
                      item.photoFilePath
                  }}
                  style={{ width: 200, height: 200 }}
                />
                <Text>Name: {item.name}</Text>
                <Text>Description: {item.description}</Text>
                <Text>Location: {item.location}</Text>
                <Text>Cost: {item.cost}</Text>
                <Button title="check" onPress={fetchAdverts} color={Colors.main}  ></Button>
              </View>
            )}
          />
        )
        : (
          <Text>Loading...</Text>
        )}
    </View>
  );
};

export default Adverts;
