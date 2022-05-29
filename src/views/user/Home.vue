<template>
  <div class="main">
    <Title title="房间总览"></Title>
    <el-table :data="roomData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="180" />
      <el-table-column prop="room_number" label="房间号" width="180" />
      <el-table-column prop="room_type" label="房间类型" width="180" />
      <el-table-column prop="room_price" label="房间价格" />
      <el-table-column prop="room_status" label="房间状态">
        <template #default="scope">
          <span>{{
            scope.row.room_status == 1
              ? "预订未入住"
              : scope.row.room_status == 2
              ? "空闲"
              : "已入住"
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            v-if="scope.row.room_status == (1 || 2)"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >办理入住</el-button
          >
          <el-button
            v-if="scope.row.room_status != (1 || 2)"
            size="small"
            @click="handleEdit(scope.$index, scope.row)"
            >办理退房</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <br />
    <el-pagination
      background
      layout="prev, pager, next"
      :total="50"
      :hide-on-single-page="value"
      :size="10"
    />

    <br />
    <el-button type="primary" @click="addCheckIn">办理入住</el-button>
    <el-button type="info" @click="addRoomDialogVisible = true"
      >添加房间</el-button
    >
  </div>
  <!--添加房间dialog -->
  <el-dialog v-model="addRoomDialogVisible" title="添加客房">
    <el-form :model="new_room" :size="defalut">
      <el-form-item label="房间号" :label-width="formLabelWidth">
        <el-input v-model="new_room.room_number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房间级别" :label-width="formLabelWidth">
        <el-select v-model="new_room.room_level" placeholder="请选择房间级别">
          <el-option value="1" label="总统套房" />
          <el-option value="2" label="豪华套房" />
          <el-option value="3" label="标准套房" />
          <el-option value="4" label="标准双人房" />
          <el-option value="5" label="标准单间" />
          <el-option value="6" label="棋牌房" />
          <el-option value="7" label="钟点房" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >Confirm</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {
  ElTable,
  ElTableColumn,
  ElPagination,
  ElDialog,
  ElSelect,
  ElOption,
} from "element-plus";
import Title from "../../components/Title.vue";
import axios from "axios";

//添加房间
import { reactive, ref } from "vue";

const add_room = reactive({
  room_number: "",
  room_level: "",
  room_type: "",
  room_price: 100,
  room_status: 2,
});

export default {
  name: "User_Home",
  data() {
    return {
      roomData: null,
      addRoomDialogVisible: ref(false),
      new_room: add_room,
      formLabelWidth: "140px",
    };
  },
  created() {
    axios.get("/api/rooms").then((res) => {
      console.log(res.data);
      this.roomData = res.data;
    });
  },
  components: {
    ElTable,
    Title,
    ElTableColumn,
    ElPagination,
    ElDialog,
    ElSelect,
    ElOption,
  },
  computed: {},
  methods: {
    addRoom() {},
  },
};
</script>

<style></style>
