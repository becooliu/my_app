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
          <span :index="scope.row.room_status">{{
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
            :index="scope.row.room_status"
            v-if="scope.row.room_status == 1 || scope.row.room_status == 2"
            @click="checkIn(scope.$index, scope.row)"
            size="small"
            >办理入住</el-button
          >
          <el-button
            v-else
            @click="checkOut(scope.$index, scope.row)"
            size="small"
            >办理退房</el-button
          >
          <el-button
            type="danger"
            @click="removeRoom(scope.$index, scope.row)"
            size="small"
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
      :size="10"
    />

    <br />
    <el-button type="primary" size="small">办理入住</el-button>
    <el-button type="info" @click="addRoomDialogVisible = true" size="small"
      >添加房间</el-button
    >
  </div>
  <!--添加房间dialog -->
  <el-dialog v-model="addRoomDialogVisible" title="添加客房">
    <el-form :model="new_room" :rules="new_room_rules" ref="new_room">
      <el-form-item
        label="房间号"
        prop="room_number"
        :label-width="formLabelWidth"
      >
        <el-input v-model="new_room.room_number" autocomplete="off" />
      </el-form-item>
      <el-form-item label="房间级别" :label-width="formLabelWidth">
        <el-select v-model="new_room.room_level" placeholder="请选择房间级别">
          <el-option value="1=总统套房" label="总统套房" />
          <el-option value="2=豪华套房" label="豪华套房" />
          <el-option value="3=标准套房" label="标准套房" />
          <el-option value="4=标准双人房" label="标准双人房" />
          <el-option value="5=标准单间" label="标准单间" />
          <el-option value="6=棋牌房" label="棋牌房" />
          <el-option value="7=钟点房" label="钟点房" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="价格"
        prop="room_price"
        :label-width="formLabelWidth"
      >
        <el-input v-model="new_room.room_price" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addRoomDialogVisible = false" size="small"
          >取消</el-button
        >
        <el-button type="primary" @click="addNewRoom('new_room')" size="small"
          >确认添加房间</el-button
        >
      </span>
    </template>
  </el-dialog>

  <!--办理入住-->
  <el-dialog v-model="checkInDialogVisible" title="办理入住">
    <el-form :model="checkInData" :rules="new_room_rules" ref="checkIn_room">
      <el-form-item
        label="房间号"
        prop="room_number"
        :label-width="formLabelWidth"
      >
        <el-input v-model="checkInData.room_number" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="房间级别"
        prop="room_type"
        :label-width="formLabelWidth"
      >
        <el-input v-model="checkInData.room_type" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="价格"
        prop="room_price"
        :label-width="formLabelWidth"
      >
        <el-input v-model="checkInData.room_price" autocomplete="off" />
      </el-form-item>
    </el-form>

    <el-form
      :model="initCheckInData"
      :rules="checkInRules"
      ref="checkIn_custom_info"
    >
      <el-form-item
        label="房客姓名"
        prop="customer_name"
        :label-width="formLabelWidth"
      >
        <el-input v-model="initCheckInData.customer_name" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="身份证号"
        prop="customer_ID"
        :label-width="formLabelWidth"
      >
        <el-input v-model="initCheckInData.customer_ID" autocomplete="off" />
      </el-form-item>
      <el-form-item
        label="联系电话"
        prop="customer_phone_number"
        :label-width="formLabelWidth"
      >
        <el-input
          v-model="initCheckInData.customer_phone_number"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item label="备注" prop="comment" :label-width="formLabelWidth">
        <el-input v-model="initCheckInData.comment" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="addRoomDialogVisible = false" size="small"
          >取消</el-button
        >
        <el-button type="primary" @click="confirmCheckIn()" size="small"
          >确认入住</el-button
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
  ElMessage,
} from "element-plus";
import Title from "../../components/Title.vue";
import axios from "axios";
import { isID, isPhone } from "../../../utils/index";

//添加房间
import { reactive, ref } from "vue";
const add_room = reactive({
  room_number: "",
  room_level: "",
  room_type: "",
  room_price: 100,
  room_status: 2,
});

// 办理入住
const initCheckInData = reactive({
  customer_name: "",
  customer_ID: "",
  customer_phone_number: "",
  comment: "None",
});

export default {
  name: "User_Home",
  data() {
    //校验新增房间号
    let checkRoomNumber = (rule, value, callback) => {
      if (!value || !Number(value)) {
        return callback(new Error("房间号不能为空"));
      }
      if (!Number(value)) {
        return callback(new Error("房间号只能是数字"));
      }
      callback();
    };

    //校验新增房间价格
    let checkRoomPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("房间价格不能为空"));
      }
      if (!Number(value)) {
        return callback(new Error("房间价格只能是数字"));
      }
      callback();
    };
    //校验入住房客姓名
    let checkCustomerName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("房客姓名不能为空"));
      }
      if (Number(value)) {
        return callback(new Error("房客姓名不能是数字"));
      }
      callback();
    };
    //校验入住房客联系电话
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("房客联系电话不能为空"));
      }
      if (!isPhone(value)) {
        return callback(new Error("房客联系电话错误"));
      }
      callback();
    };
    //校验入住房客身份证号
    let checkCustomerID = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("房客身份证号不能为空"));
      }
      if (!isID(value)) {
        return callback(new Error("房客身份证号错误"));
      }
      callback();
    };

    return {
      roomData: null,
      addRoomDialogVisible: ref(false),
      checkInDialogVisible: ref(false),
      checkInData: null,
      formLabelWidth: "140px",
      new_room: add_room,
      new_room_rules: {
        room_number: [{ validator: checkRoomNumber, trigger: "blur" }],
        room_price: [{ validator: checkRoomPrice, trigger: "blur" }],
      },
      initCheckInData,
      checkInRules: {
        customer_name: [{ validator: checkCustomerName, trigger: "blur" }],
        customer_ID: [{ validator: checkCustomerID, trigger: "blur" }],
        customer_phone_number: [{ validator: checkPhone, trigger: "blur" }],
      },
    };
  },
  created() {
    //获取房间信息
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
    addNewRoom(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //console.log(this.new_room);
          axios.post("/api/rooms/add", this.new_room).then((res) => {
            ElMessage({
              type: "success",
              message: res.data.message,
            });
          });
        } else {
          ElMessage({
            type: "error",
            message: "非法的数据，请检查。",
          });
        }
      });
    },
    checkIn(index, row) {
      //取得当前办理入住的房间的信息并在弹窗中显示
      this.checkInDialogVisible = true;
      console.log(index, row);
      this.checkInData = row;
    },
    confirmCheckIn() {
      let postData = { ...this.checkInData, ...this.initCheckInData };
      console.log(postData);
    },
  },
};
</script>

<style></style>
