<template>
  <div>
    <div>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="4">
          <form
            @submit.prevent="addMember"
            style="display: inline-block; margin: 20px; float: left"
          >
            <h2>Add Member</h2>
            <v-text-field label="Name" v-model="name"></v-text-field>
            <v-text-field
              label="Vasuli"
              v-model="vasuli"
              type="number"
            ></v-text-field>
            <v-btn type="primary"> {{ label }} </v-btn>
          </form>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="5">
          <form
            action=""
            style="display: inline-block"
            @submit.prevent="addKharch"
          >
            <h2>Daily Kharch</h2>
            <v-text-field label="Day" v-model="day"></v-text-field>
            <v-text-field label="Kharch" v-model="kharch"></v-text-field>
            <v-text-field
              label="Total Sathi"
              v-model="totalMembers"
            ></v-text-field>
            <v-btn type="primary"> Save </v-btn>
          </form>
        </v-col>
      </v-row>
    </div>
    <div>
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="3">
          <h2>Total Vasuli</h2>
          <h3 style="text-align: center">{{ totalVasuli }}</h3>
        </v-col>
        <v-col cols="3">
          <h2>Total Kharch</h2>
          <h3 style="text-align: center">{{ totalKharch }}</h3>
        </v-col>
        <v-col cols="3">
          <h2>Balance / Due</h2>
          <h3 style="text-align: center">{{ totalVasuli - totalKharch }}</h3>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>
    </div>
    <div>
      <table style="margin-top: 2rem">
        <tr>
          <th>Name</th>
          <th>Vasuli</th>
          <th>{EDIT}</th>
          <th>Balance / due</th>
          <th v-for="item in days" :key="item">
            Day {{ item.day }} ( {{ item.kharch }} /- )
          </th>
        </tr>
        <tr v-for="(item, index) in members" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.vasuli }}</td>
          <v-btn @click="edit(index)">Edit</v-btn>
          <td>{{ item.vasuli - kharchPerPerson.toFixed(2) }}</td>
          <td>{{ item.day1 }}</td>
          <td>{{ item.day2 }}</td>
          <td>{{ item.day3 }}</td>
          <td>{{ item.day4 }}</td>
          <td>{{ item.day5 }}</td>
          <td>{{ item.day6 }}</td>
          <td>{{ item.day7 }}</td>
          <td>{{ item.day8 }}</td>
          <td>{{ item.day9 }}</td>
          <td>{{ item.day10 }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      label: "Add",
      name: "",
      members: [],
      vasuli: 0,
      totalMembers: 0,
      kharch: 0,
      day: 0,
      days: [],
      kharchPerPerson: 0,
      totalKharch: 0,
      editMember: null,
    };
  },
  methods: {
    edit(ind) {
      this.label = "edit";
      this.members.filter((ele, index) => {
        if (ind == index) {
          this.vasuli = ele.vasuli;
          console.log(ele, "ele");
        }
      });
      this.editMember = ind;
      console.log(this.editMember, this.members[ind], "members[ind]");
    },
    addKharch() {
      let equalAmount = this.kharch / this.totalMembers;
      this.totalKharch += Number(this.kharch);
      this.kharchPerPerson += equalAmount;
      let newKey = "day" + this.day;
      this.members.forEach((ele) => {
        ele[newKey] = Number(equalAmount.toFixed(2));
      });
      this.days.push({ day: this.day, kharch: this.kharch });
      console.log(this.members, "mems");
      this.day = "";
      this.kharch = "";
      this.totalMembers = "";
    },
    addMember() {
      if (this.label == "Add") {
        this.members.push({
          name: this.name,
          vasuli: this.vasuli,
        });
        this.name = "";
        this.vasuli = "";
      } else {
        console.log(this.members[this.editMember], "editmember");
        this.members[this.editMember].vasuli = this.vasuli;
        console.log(this.members[this.editMember].vasuli, this.vasuli, "----");
        this.editMember = null;
        this.label = "Add";
        this.name = "";
        this.vasuli = "";
      }
    },
  },
  created() {
    console.log("Hello World");
  },
  computed: {
    totalVasuli() {
      let sum = 0;
      this.members.forEach((ele) => {
        sum += Number(ele.vasuli);
      });
      return Number(sum);
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 12px;
  box-shadow: 0 2px 8px gray;
  padding: 1rem;
  margin: 2rem auto;
  max-width: 40rem;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid green;
}
th,
td {
  text-align: left;
  padding: 15px;
}
tr:nth-child(even) {
  background-color: rgb(203, 255, 194);
  color: rgb(0, 0, 0);
}
th {
  background: blue;
  color: white;
}
tr:nth-child(odd):hover {
  background-color: rgba(251, 255, 0, 0.699);
}
tr:nth-child(even):hover {
  background-color: rgb(92, 255, 71);
}
div {
  background-color: rgb(226, 255, 216);
}
h2 {
  color: #de25ff;
  font-size: 54px;
  font-family: "Arial Narrow Bold";
  line-height: 58px;
  padding: 20px;
  text-align: center;
}
</style>
