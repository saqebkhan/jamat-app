<template>
  <div>
    <div ref="editor" style="height: 400px"></div>
  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
export default {
  mounted() {
    this.editor = new Quill(this.$refs.editor, {
      theme: 'snow'
    });
  },
  data() {
    return {
      editor: null
    };
  }
};
</script>