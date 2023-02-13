<template>
  <div class="hacker-news-list">
    <!-- <div class="hacker-news-header">
      <a target="_blank" href="http://www.ycombinator.com/">
        <img src="https://news.ycombinator.com/y18.gif" />
      </a>
      <span>Hacker News</span>
    </div> -->
    <div class="hacker-news-item" v-for="(item, index) in list" :key="index">
      <span class="num" v-text="index + 1"></span>
      <p>
        <!-- <a target="_blank" :href="item.url" v-text="item.title"></a> -->
        {{ item.name }}
      </p>
    </div>
    <infinite-loading @infinite="infiniteHandler">
      <span slot="no-more"> There is no more Hacker News :( </span>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";

const api = "http://hn.algolia.com/api/v1/search_by_date?tags=story";

export default {
  data() {
    return {
      data: [
        { name: "Saqeb", number: 1 },
        { name: "Ali", number: 2 },
        { name: "Amer", number: 3 },
        { name: "Sameer", number: 4 },
        { name: "Shahzeb", number: 5 },
        { name: "Wasim", number: 6 },
        { name: "Gaffar", number: 7 },
        { name: "Sattar", number: 8 },
        { name: "Sami", number: 9 },
        { name: "Adil", number: 10 },
        { name: "Tohit", number: 11 },
        { name: "Bond", number: 12 },
        { name: "javed", number: 13 },
        { name: "hakeem", number: 14 },
        { name: "Dawood", number: 15 },
      ],
      list: [],
    };
  },
  methods: {
    infiniteHandler($state) {
      axios
        .get(api, {
          params: {
            page: this.list.length / 20 + 1,
          },
        })
        .then(({ data }) => {
          if (data.hits.length) {
            this.list = this.list.concat(data.hits);
            $state.loaded();
            if (this.list.length / 20 === 10) {
              $state.complete();
            }
          } else {
            $state.complete();
          }
        });
    },
  },
  components: {
    InfiniteLoading,
  },
};
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  width: 200px;
  height: 300px;
  margin: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

h3 {
  margin-top: 10px;
}
.hacker-news-item {
  height: 200px;
}
</style>
