<template>
    <el-dialog v-model="formVisible" title="修改用户信息" width="500" :modal="false" :align-center="true" center
        :close-on-click-modal="false" class="form-dialog" modal-class="dialog-modal" @close="emits('close-dialog')">
        <el-form :label-position="labelPosition" label-width="auto">
            <el-form-item label="用户昵称：">
                <el-input v-model="nickName" placeholder="请输入用户昵称" type="text" maxlength="10" style="width: 350px;"
                    size="large" />
            </el-form-item>
            <el-form-item label="用户头像：">
                <div class="user-avatar">
                    <div style="height: 100%;display: flex;">
                        <img :src="avatarUrl || InitialAvatar" />
                    </div>
                    <div class="overlay">
                        <div class="icon">
                            <el-icon size="40" color="#fff" @click="dialogVisible = true">
                                <zoom-in />
                            </el-icon>
                            <el-upload class="avatar-uploader">
                                <img :src="UploadImg" />
                            </el-upload>
                        </div>
                    </div>
                </div>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="debounceChangeUserInfo">
                    确定
                </el-button>
                <el-button @click="emits('close-dialog')">取消</el-button>
            </div>
        </template>
    </el-dialog>
    <el-dialog v-model="dialogVisible" class="fullImgView" :align-center="true" center width="40%">
        <img w-full :src="avatarUrl || InitialAvatar" />
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { debounce } from "lodash-es";
import UploadImg from '@/assets/img/user-avatar/imgChange.png'
import InitialAvatar from '@/assets/img/user-avatar/userAvatar.png'
const formVisible = ref(true);
const dialogVisible = ref(false);
const emits = defineEmits(['close-dialog', 'change-userInfo'])
const nickName = ref('')
const avatarUrl = ref('')
const props = defineProps<{
    labelPosition: string,
    nickName: string,
    avatarUrl: string
}>()
const debounceChangeUserInfo = debounce(() => {
    emits('change-userInfo', nickName.value, avatarUrl.value)
}, 500)
onMounted(() => {
    nickName.value = props.nickName;
    avatarUrl.value = props.avatarUrl;
})
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
    letter-spacing: 5px;
    color: #000;
    font-weight: 600;
}

.el-form-item {
    display: flex;
    align-items: center;

    :deep(.el-form-item__content) {
        display: flex;
        justify-content: center;
    }

    .user-avatar {
        width: 350px;
        position: relative;

        img {
            width: 100%;
        }

        .overlay {
            display: flex;
            align-items: center;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            opacity: 0;
            transition: opacity 0.3s;

            .el-icon {
                cursor: pointer;
            }

            .icon {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100%;

                .avatar-uploader {
                    width: 50px;
                    height: 50px;
                    position: relative;

                    img {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                    }
                }
            }
        }

        .overlay:hover {
            opacity: 1;
        }
    }
}
</style>
<style lang="scss">
.fullImgView {
    position: relative;
    padding: 0;

    .el-dialog__header {
        display: none;
    }

    .el-dialog__body {
        display: flex;
    }

    img {
        width: 100%
    }
}
</style>