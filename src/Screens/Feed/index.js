import React, { useState, useEffect } from "react";

import { View, FlatList } from "react-native";

import api from "../../services/api.js";

import {
  Post,
  Header,
  Avatar,
  Name,
  PostImage,
  Description
} from "./styles.js";

export default function Feed() {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function loadPage(pageNumber = page) {
    try {
      const response = await api.get(
        `/feed?_expand=author&_limit=5&_page=${pageNumber}`
      );

      const data = await response.data;
      const total = await response.headers["x-total-count"];
      console.log(total);

      setTotal();

      setFeed([...feed, ...data]);

      setPage(pageNumber + 1);
    } catch (error) {
      console.log("Erro da busca: " + error.message);
    }
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        onEndReached={() => loadPage()}
        onEndReachedThreshold={0.1}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <PostImage ratio={item.aspectRatio} source={{ uri: item.image }} />

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
