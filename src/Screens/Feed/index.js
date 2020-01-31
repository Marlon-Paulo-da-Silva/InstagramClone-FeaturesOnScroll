import React, { useState, useEffect, useCallback } from "react";

import { View, FlatList } from "react-native";

import api from "../../services/api.js";

import { Post, Header, Avatar, Name, Description, Loading } from "./styles.js";

import LazyImage from "../../components/LazyImage/index.js";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    try {
      const response = await api.get(
        `/feed?_expand=author&_limit=5&_page=${pageNumber}`
      );

      const data = await response.data;

      const totalItems = await response.headers["x-total-count"];

      setTotal(Math.floor(totalItems / 5));

      setFeed(shouldRefresh ? data : [...feed, ...data]);

      setPage(pageNumber + 1);
      setLoading(false);
    } catch (error) {
      console.log("Erro da busca: " + error.message);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  async function refreshList() {
    setRefreshing(true);
    await loadPage(1, true);
    setRefreshing(false);
  }

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);
  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        onRefresh={refreshList}
        refreshing={refreshing}
        onViewableItemsChanged={handleViewableChanged}
        ListFooterComponent={loading && <Loading />}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <LazyImage
              shouldLoad={viewable.includes(item.id)}
              aspectRatio={item.aspectRatio}
              smallSource={{ uri: item.small }}
              source={{ uri: item.image }}
            />

            <Description>
              <Name>{item.author.name}</Name>
              {item.description}
            </Description>
          </Post>
        )}
      />
    </View>
  );
}
