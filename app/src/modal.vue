<template>
    <div class="modal" :class="{ 'show': showModal }">
        <div class="modal-content">
            <span class="close" @click="this.$emit('update:showModal', false)">&times;</span>
            <slot></slot>
        </div>
    </div>
</template>
  
<script>

export default {

    props: {
        showModal: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style scoped>
.modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.show {
    display: block;
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>