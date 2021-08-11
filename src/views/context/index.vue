<template>
  <div class="article-container">
    <el-card class="top-card">
      <div slot="header" class="clearfix">
        <span>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          </el-breadcrumb>
        </span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >操作按钮</el-button
        > -->
      </div>
      <div class="text item">
        <el-form
          v-loading="loading"
          size="mini"
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="状态">
            <el-radio-group v-model="status">
              <el-radio :label="null">全部</el-radio>
              <el-radio :label="0">草稿</el-radio>
              <el-radio :label="1">待审核</el-radio>
              <el-radio :label="2">审核通过</el-radio>
              <el-radio :label="3">审核失败</el-radio>
              <el-radio :label="4">已删除</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
            <el-select v-model="channelsid" placeholder="请选择">
              <el-option label="全部" :value="null"> </el-option>
              <el-option
                v-for="(item, index) in articlechanneldata"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期">
            <el-date-picker
              v-model="picktime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card" size>
      <div slot="header" class="clearfix">查询到{{ totalCount }}条数据</div>
      <div class="text item">
        <el-table
          v-loading="loading"
          stripe
          :data="articles1"
          style="width: 100%"
        >
          <el-table-column prop="pubdate" label="封面">
            <template slot-scope="scope">
              <!-- <img
                v-if="scope.row.cover.images[0]"
                class="picicon"
                :src="scope.row.cover.images[0]"
                alt=""
              />
              <img
                class="picicon"
                v-else
                src="../loginpage/toutiao-logo.jpg"
                alt=""
              /> -->
              <el-image
                style="width: 100px; height: 100px"
                :src="scope.row.cover.images[0]"
                fit="cover"
              ></el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
          <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status === 2">审核通过</el-tag>
              <el-tag v-if="scope.row.status === 0" type="success">草稿</el-tag>
              <el-tag v-if="scope.row.status === 1" type="info">代审核</el-tag>
              <el-tag v-if="scope.row.status === 3" type="warning"
                >审核失败</el-tag
              >
              <el-tag v-if="scope.row.status === 4" type="danger"
                >已删除</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                circle
                icon="el-icon-edit"
                @click="handleEdit(scope.row)"
              ></el-button>
              <el-button
                type="danger"
                circle
                icon="el-icon-delete"
                @click="handleDelete(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          class="pages"
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pagesize"
          :current-page.sync="pages"
          @current-change="current"
          :disabled="loading"
        >
          <!-- .sync -->
          <!-- 这样一来，visible就实现了父子同步，父组件初始化visible，子组件调用关闭事件，触发父组件update事件，父组件在update事件中更新visible变量，改变子组件可见的状态 -->
          <!-- 我们在实现双向绑定时经常使用v-modal,这里看来，使用.sync也是可以的，不同在于v-modal触发的是父组件的input事件，.sync触发的是父组件的update事件 -->
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  getarticle,
  getarticlechannel,
  deletarticle,
} from '@/api/getarticle.js'
export default {
  name: 'article',
  data() {
    return {
      form: {
        resource: '',
        region: '',
        days: '',
      },
      valiablepage: true,
      loading: true,
      totalCount: 0,
      pagesize: 10,
      status: null,
      channelsid: null,
      picktime: [],
      pages: 1,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      articles1: [],
      articlechanneldata: '',
    }
  },
  created() {
    this.getarticle1(1)
    getarticlechannel().then((res) => {
      // console.log(res)
      this.articlechanneldata = res.data.data.channels
      this.loading = false
      this.valiablepage = false
    })
  },
  methods: {
    current(e) {
      // console.log(e)
      // this.currentpage = e
      this.getarticle1(e)
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true,
      })
        .then(() => {
          deletarticle(id.toString()).then((res) => {
            console.log(res)
            this.getarticle1(this.pages)
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
          })
        })
        .catch(() => {})
      // console.log(id.toString()) //这里是因为在request中用了jsonbigint
    },
    getarticle1(page = 1) {
      this.loading = true
      this.valiablepage = false
      getarticle({
        page,
        per_page: this.pagesize,
        status: this.status,
        channel_id: this.channelsid,
        // begin_pubdate: '2020-07-10',
        begin_pubdate: this.picktime ? this.picktime[0] : null,
        end_pubdate: this.picktime ? this.picktime[1] : null,
      }).then((res) => {
        console.log(res.data.data)
        const { results, total_count: totalcountpage } = res.data.data
        this.articles1 = results
        this.totalCount = totalcountpage
        this.loading = false
      })
    },
    onSubmit() {
      this.getarticle1()
    },
  },
}
</script>

<style lang="less" scoped>
.top-card {
  margin-bottom: 30px;
}
.pages {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.show {
  height: 20px;
  width: 60px;
  background: #000;
}
.notshow {
  height: 20px;
  width: 60px;
  background: pink;
}
.picicon {
  width: 100px;
  height: 100px;
}
</style>
