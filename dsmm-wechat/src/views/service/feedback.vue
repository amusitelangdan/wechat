<template>
  <div>
    <mt-popup
      v-model="popupVisible"
      position="bottom" style="width: 100%" :closeOnClickModal="false">
      <confirmation v-on:confirm="confirmSelect" v-on:cancel="cancelSelect"></confirmation>
      <mt-picker ref="picker" :slots="slots" valueKey="name"></mt-picker>
    </mt-popup>
    <div class="card">
      <div class="card-cell_link">
        <div @click="selection"><span>{{feedbackTypeName}}</span><span v-if="!feedbackTypeName" class="color-info">请选择建议类型</span></div>
      </div>
      <div class="card-cell" style="border: 0;">
        <textarea rows="8" placeholder="请输入建议内容" style="display: block; width: 100%; padding: 0; border: 0;outline: none;resize: none;" v-model="editing.content"></textarea>
      </div>
      <div style="margin: 1rem 0 0;display: flex;flex-wrap: wrap">
        <DeletePhoto v-for="(image, index) in imageUrlList" :key="index" v-bind:image="image" v-bind:imageUrlList="imageUrlList"  v-on:deleteImage="deleteImage"></DeletePhoto>
        <UploadPhotos v-if="imageUrlList.length <= 8" v-on:uploaded="uploaded"></UploadPhotos>
      </div>
      <div class="card-cell" style="padding: 0;border: 0;">
        <div v-if="editing.phone" class="input_line" style="line-height: 100%">{{editing.phone}}</div>
        <input v-else class="input_line" type="text" placeholder="请输入您的手机联系方式" v-model="editing.phone">
      </div>
      <div class="card-cell color-info" style="font-size: 12px; line-height: 1.5rem">
        <div v-if="childName" style="margin-bottom: 1rem">
          <div>
            建议人信息
          </div>
          <div>
            姓名: {{parentName}}
          </div>
          <div>
            宝宝: {{childName}}
          </div>
          <!--<div>-->
            <!--班级: {{className}}-->
          <!--</div>-->
        </div>
        <div>
          非常感谢您给我们提的建议！
        </div>
      </div>
    </div>
    <div @click="submitSure" class="button-block_primary" style="margin-top: 20px;">提交反馈</div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import Confirmation from '../../components/button/PopUpConfirmation';
  import UploadPhotos from '../../components/button/UploadPhotos';
  import DeletePhoto from '../../components/layout/Thumbnail';

  export default {
    data() {
      return {
        popupVisible: false,
        feedbackTypeName: '',
        childName: '',
        className: '',
        parentName: '',
        phone: '',
        slots: [
          {
            flex: 1,
            values: [
              {
                name: '园区卫生',
                type: 1,
              },
              {
                name: '餐饮情况',
                type: 2,
              },
              {
                name: '教学内容',
                type: 3,
              },
              {
                name: '老师服务',
                type: 4,
              },
              {
                name: '其他',
                type: 5,
              },
            ],
            textAlign: 'center',
          },
        ],
        editing: {
          type: '',
          content: '',
          photos: '',
          phoneNumber: '',
          childId: '',
          phone: '',
        },
        imageUrl: '',  // 图片url
        imageUrlList: [], // 多张图片url
        deleteImageUrl: '',
      };
    },
    components: {
      Confirmation,
      UploadPhotos,
      DeletePhoto,
    },
    computed: {
      ...mapState({
        selectedClassName: state => state.parent.selectedClassName,
        childList: state => state.parent.childList,
      }),
    },
    methods: {
      ...mapActions({
        postFeedback: 'postFeedback',
      }),
      // 图片上传
      uploaded(index) {
        this.imageUrl = index;
        if (this.imageUrlList.length <= 8) {
          this.imageUrlList.push(index);
        } else {
          this.$toast('最多可以上传九张图片');
        }
      },
      // 删除图片
      deleteImage(index) {
        let num = 0;
        this.imageUrlList.forEach((item, line) => {
          if (item === index) {
            num = line;
            return num;
          }
        });
        this.imageUrlList.splice(num, 1);
      },
      selection() {
        this.popupVisible = true;
      },
      submitSure() {
        if (this.editing.phone !== '' && this.editing.type !== '') {
          if (/^(13|15|18|17)\d{9}$/i.test(this.editing.phone)) {
            if (this.editing.content !== '') {
              if (this.$route.query.childId) {
                this.postFeedback({
                  type: this.editing.type,
                  content: this.editing.content,
                  photos: JSON.stringify(this.imageUrlList),
                  phoneNumber: this.editing.phone,
                  childId: this.$route.query.childId,
                }).then(() => {
                  this.$router.push({
                    path: '/success',
                    query: {
                      type: '意见反馈',
                    },
                  });
                });
              } else {
                this.postFeedback({
                  type: this.editing.type,
                  content: this.editing.content,
                  photos: JSON.stringify(this.imageUrlList),
                  phoneNumber: this.editing.phone,
                }).then((res) => {
                  this.$router.push({
                    path: '/success',
                    query: {
                      type: '意见反馈',
                    },
                  });
                });
                this.$toast('建议已经收到，我们会尽快联系您!');
              }
            } else {
              this.$toast('请输入建议内容');
            }
          } else {
            this.$toast('请输入正确手机号码');
          }
        } else if (this.editing.type === '') {
          this.$toast('请选择建议类型，方便客服联系');
        } else if (this.editing.phone === '') {
          this.$toast('请输入手机号，方便客服联系您');
        }
      },
      confirmSelect() {
        this.feedbackTypeName = this.$refs.picker.getSlotValue(0).name;
        this.editing.type = this.$refs.picker.getSlotValue(0).type;
        this.popupVisible = false;
      },
      cancelSelect() {
        this.popupVisible = false;
      },
    },
    created() {
      if (localStorage.getItem('phone')) {
        this.editing.phone = localStorage.getItem('phone');
      }
      if (this.$route.query.childId) {
        this.editing.childId = this.$route.query.childId;
        this.childList.forEach((child) => {
          if (child.id === parseInt(this.$route.query.childId, 10)) {
            this.childName = child.name;
            this.className = this.selectedClassName;
            if (localStorage.getItem('phone') === JSON.parse(child.parent).father.phone) {
              this.parentName = JSON.parse(child.parent).father.name;
            } else if (localStorage.getItem('phone') === JSON.parse(child.parent).grandfather.phone) {
              this.parentName = JSON.parse(child.parent).grandfather.name;
            } else if (localStorage.getItem('phone') === JSON.parse(child.parent).grandmother.phone) {
              this.parentName = JSON.parse(child.parent).grandmother.name;
            } else if (localStorage.getItem('phone') === JSON.parse(child.parent).grandpa.phone) {
              this.parentName = JSON.parse(child.parent).grandpa.name;
            } else if (localStorage.getItem('phone') === JSON.parse(child.parent).mother.phone) {
              this.parentName = JSON.parse(child.parent).mother.name;
            } else if (localStorage.getItem('phone') === JSON.parse(child.parent).other.phone) {
              this.parentName = JSON.parse(child.parent).other.name;
            }
          }
        });
      }
    },
  };
</script>
<style lang="less" scoped>
</style>
