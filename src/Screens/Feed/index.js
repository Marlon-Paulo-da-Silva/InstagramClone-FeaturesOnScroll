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

  useEffect(() => {
    async function loadFeed() {
      try {
        const response = await api.get("/feed?_expand=author&_limit=5&_page=1");

        console.log("passou por aqui");
        console.log(response.data);
        setFeed(response.data);
      } catch (error) {
        console.log("Erro da busca: " + error.message);
      }
    }

    loadFeed();
  }, []);

  return (
    <View>
      <FlatList
        data={feed}
        keyExtractor={post => String(post.id)}
        renderItem={({ item }) => (
          <Post>
            <Header>
              <Avatar source={{ uri: item.author.avatar }} />
              <Name>{item.author.name}</Name>
            </Header>

            <PostImage source={{ uri: item.image }} />

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
