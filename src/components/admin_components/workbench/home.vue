<template>
  <div>
    <Row class="mzmy-nv-title">
      <Col span="24">品牌信息</Col>
    </Row>
    <Row class="mzmy-nv-info form-list" :gutter="16">
      <Col span="3" class="text-right">品牌名称:</Col>
      <Col span="21">222
        <span class="edit">修改</span>
      </Col>
    </Row>
    <Row class="mzmy-nv-info form-list" :gutter="16">
      <Col span="3" class="text-right">品牌LOGO:</Col>
      <Col span="21">
      <Avatar shape="square" icon="person" size="large" />
      <span class="edit">修改</span>
      </Col>
    </Row>
    <Row class="mzmy-nv-info form-list" :gutter="16">
      <Col span="3" class="text-right">主营类目:</Col>
      <Col span="21">222
      <span class="edit">修改</span>
      </Col>
    </Row>
    <Row class="mzmy-nv-info form-list" :gutter="16">
      <Col span="3" class="text-right">品牌客服:</Col>
      <Col span="21">222
      <span class="edit">修改</span>
      </Col>
    </Row>
    <Row class="mzmy-nv-info form-list" :gutter="16">
      <Col span="3" class="text-right">联系人姓名:</Col>
      <Col span="21">222
      <span class="edit">修改</span>
      </Col>
    </Row>
    <Row class="mzmy-nv-info form-list" :gutter="16">
      <Col span="3" class="text-right">联系人电话:</Col>
      <Col span="21">222
      <span class="edit">修改</span>
      </Col>
    </Row>
    <Row class="mzmy-nv-info form-list" :gutter="16">
      <Col span="3" class="text-right">主体信息:</Col>
      <Col span="21">222
      <span class="edit">修改</span>
      </Col>
    </Row>
    <Row class="mzmy-nv-info form-list" :gutter="16">
      <Col span="3" class="text-right">品牌认证:</Col>
      <Col span="21">222
      <span class="edit">修改</span>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'Store',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style scoped>

</style>
