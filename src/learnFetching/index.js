import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';

//APIKey 7a0ce75211e146319b70abd7adecde16 from https://newsapi.org/

const Index = () => {
  const [data, setData] = useState();

  const getData = () => {
    Axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        country: 'us',
        category: 'business',
        apiKey: '7a0ce75211e146319b70abd7adecde16',
      },
    }).then(res => {
      //console.log('res: ', res)
      setData(res.data.articles);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* {console.log(data)} */}
      <View>
        <ScrollView>
          {data &&
            data.map((item, i) => {
              return (
                <View style={styles.viewData}>
                  <Image
                    style={styles.images}
                    source={{uri: item.urlToImage}}
                  />
                  <View style={styles.containerText}>
                    <Text>{item.title}</Text>
                    <Text numberOfLines={2}>{item.description}</Text>
                    <Text>{item.author}</Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  viewData: {
      flexDirection: 'row',
      padding: 10
  },
  images: {
    width: 80,
    height: 80,
    borderRadius: 13
  },
  title: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  containerText: {
    paddingHorizontal: 10,
  }
});

export default Index;
