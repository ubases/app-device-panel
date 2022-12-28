<template>
  <div class="axy-permission">
    <!-- IOS提示打开蓝牙 -->
    <van-dialog closeOnClickOverlay v-model="turnonbleShow" :title="$t('home.turnonbluetooth')"
        @confirm="turnonbleShow = false" :confirmButtonText="$t('public.gotit')">
        <div class="info">
          <span>{{$t('home.info2')}}</span>
          <img src="images/beltips.png" width="60%"/>
        </div>
    </van-dialog>
    <!-- 提示开启蓝牙权限 -->
    <van-dialog closeOnClickOverlay v-model="bluetoothShow" :title="$t('home.bluetooth')"
        @confirm="openSettings('permission')" showCancelButton :confirmButtonText="$t('home.setting')">
        <div class="info">{{$t('home.bluetoothInfo')}} </div>
    </van-dialog>
    <!-- 提示打开定位 -->
    <van-dialog closeOnClickOverlay v-model="openLocationShow" :title="$t('home.openLocation')"
        @confirm="locationShow = false"  :confirmButtonText="$t('public.gotit')">
        <div class="info">
          <span>{{$t('home.info3')}}</span>
          <img src="images/location.png" style="margin-top:20px" width="100%"/>
        </div>
    </van-dialog>
    <!-- 提示开启定位权限 -->
    <van-dialog closeOnClickOverlay v-model="locationShow" :title="$t('home.location')"
        @confirm="openSettings('location')" showCancelButton  :confirmButtonText="$t('home.setting')">
        <div class="info"> {{$t('home.locationInfo')}} </div>
    </van-dialog>
  </div>
</template>

<script>
import { openSettings, getBluetoothState, getLocationState } from "@/api/cordova";
export default {
  name: 'axy-permission',
  props: {
    
  },
  computed: {
  },
  mounted(){
    this.checkLocationPermission()
  },
  watch: {
  },
  data () {
    return {
      turnonbleShow:false, //打开蓝牙
      bluetoothShow:false,//开启蓝牙权限
      openLocationShow:false,//打开定位
      locationShow:false,//开启定位权限
    }
  },
  methods:{
    openSettings(page){
      openSettings(page)
    },
    checkBlePermission(){//检查蓝牙权限
      getBluetoothState().then((res)=>{
        console.log("-------------蓝牙-----------",res);
        if (res.code == 200) {
          console.log("获取蓝牙数据成功",res.data);
          if(res.data===-1){//未打开 
            this.turnonbleShow = this.isiOS;//苹果机弹出提示;
          }else if(res.data===-2){//无权限
            this.bluetoothShow = true
          }else{
            this.turnonbleShow = false
            this.bluetoothShow = false
          }
        }
      }).catch((res)=>{
        console.log("获取蓝牙开启状态异常",res);
        this.turnonbleShow = false;
        this.bluetoothShow = false
      })
    },
    checkLocationPermission(){//检查定位权限
      getLocationState().then((res)=>{
        console.log("-------------定位-----------",res);
        if (res.code == 200) {
          console.log("获取定位数据成功",res.data);
          if(res.data===-1){//未打开
            this.openLocationShow = this.isAndroid;//安卓机弹出提示
          }else if(res.data===-2){//无权限
            this.locationShow = true
          }else{
            this.openLocationShow = false;
            this.locationShow = false
            this.checkBlePermission()
          }
        }
      }).catch((res)=>{
        console.log("获取定位开启状态异常",res);
        this.openLocationShow = false;
        this.locationShow = false
      })
    },
  }
}
</script>

<style lang="less">
.axy-permission{
  .info{
    padding: 30px 30px 40px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8392A7;
    line-height: 20px;
  }
}
</style>
