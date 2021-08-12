<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="articleform" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articleform.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input
            :autosize="{ minRows: 20, maxRows: 40 }"
            type="textarea"
            v-model="articleform.content"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="resource">
          <el-radio-group v-model="articleform.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="region">
          <el-select
            v-model="articleform.channel_id"
            placeholder="请选择活动频道"
          >
            <el-option
              v-for="(item, index) in articlechannels"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发布</el-button>
          <el-button @click="onSubmitdraf">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getarticlechannel } from '@/api/getarticle.js'
import { publish } from '@/api/publish.js'
export default {
  data() {
    return {
      articleform: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: [],
        },
        channel_id: null,
      },
      articlechannels: [],
    }
  },
  created() {
    getarticlechannel().then((res) => {
      console.log(res.data.data.channels)
      this.articlechannels = res.data.data.channels
    })
  },

  methods: {
    onSubmitdraf() {
      publish(this.articleform, {
        draft: true,
      }).then((res) => {
        console.log(res)
        this.$message({
          message: '草稿发布成功',
          type: 'success',
        })
      })
    },
    onSubmit() {
      // console.log('submit!')
      publish(this.articleform, {
        draft: false,
      }).then((res) => {
        // console.log(res)
        this.$message({
          message: '发布成功',
          type: 'success',
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.inputarea {
  height: 500px;
}
</style>
