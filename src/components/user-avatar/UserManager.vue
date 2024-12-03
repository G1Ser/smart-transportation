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
                            <label for="upload-input" class="upload-button">
                                <img :src="UploadImg">
                            </label>
                            <input type="file" id="upload-input" accept="image/*" @change="handleFileChange" />
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
    <el-dialog v-model="cropVisible" class="cropImgView" :align-center="true" center width="38%"
        :close-on-click-modal="false" :show-close="false">
        <div class="upload-img">
            <img :src="uploadImg" ref="preImg" />
        </div>
        <div class="crop-img">
            <img :src="cropperImg" />
        </div>
        <div class="btns">
            <el-button type="primary" @click="handleCropper">裁剪</el-button>
            <el-button type="success" :disabled="!cropperImg" @click="handleSubmit">确定</el-button>
            <el-button @click="handleCancle">取消</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { debounce } from "lodash-es";
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css'
import UploadImg from '@/assets/img/user-avatar/imgChange.png'
import InitialAvatar from '@/assets/img/user-avatar/userAvatar.png'
const formVisible = ref(true);
const dialogVisible = ref(false);
const cropVisible = ref(false);
const emits = defineEmits(['close-dialog', 'change-userInfo'])
const nickName = ref('')
const avatarUrl = ref('')
const props = defineProps<{
    labelPosition: string,
    nickName: string,
    avatarUrl: string
}>()
const uploadImg = ref();
const cropperImg = ref();
const fileReader = ref<FileReader | null>(null)
const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    fileReader.value = new FileReader()
    fileReader.value.onload = () => {
        cropVisible.value = true;
        uploadImg.value = fileReader.value.result;
    }
    fileReader.value.readAsDataURL(file!)
}
const resetFileInput = () => {
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (!input) return;
    input.value = '';
};
const handleCropper = () => {
    if (!cropperInstance.value) return;
    const croppedCanvas = cropperInstance.value.getCroppedCanvas();
    const croppedImageUrl = croppedCanvas.toDataURL();
    cropperImg.value = croppedImageUrl
}
const handleSubmit = () => {
    avatarUrl.value = cropperImg.value
    handleCancle();
}
const handleCancle = () => {
    resetFileInput();
    URL.revokeObjectURL(uploadImg.value);
    fileReader.value = null;
    uploadImg.value = null;
    cropperImg.value = null;
    cropVisible.value = false;
}
const debounceChangeUserInfo = debounce(() => {
    emits('change-userInfo', nickName.value, avatarUrl.value)
}, 500)
onMounted(() => {
    nickName.value = props.nickName;
    avatarUrl.value = props.avatarUrl;
})
const preImg = ref();
const cropperInstance = ref<Cropper | null>(null);
watch(() => uploadImg.value, () => {
    if (!uploadImg.value) return
    if (cropperInstance.value) {
        cropperInstance.value.destroy();
        cropperInstance.value = null;
    }
    nextTick(() => {
        cropperInstance.value = new Cropper(preImg.value, {
            aspectRatio: 1,
            viewMode: 1,
            autoCropArea: 0.8,
            background: true
        })
    })
})
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
    letter-spacing: 5px;
    color: #000;
    font-weight: 600;
}

#upload-input {
    display: none;
}

.upload-button {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.upload-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 400px;
    background: rgba(0, 0, 0, 0.1);

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
}

.crop-img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    height: 300px;
    background: rgba(0, 0, 0, 0.1);

    img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
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
            transition: opacity 0.3s ease;

            .el-icon {
                cursor: pointer;
            }

            .icon {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 100%;
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

.cropImgView {
    position: relative;
    padding: 5px;

    .el-dialog__header {
        display: none;
    }

    .el-dialog__body {
        display: flex;
        justify-content: space-between;
    }

    .btns {
        display: flex;
        justify-content: space-around;
        width: 300px;
        position: absolute;
        right: 5px;
        bottom: 20px;
    }
}

.cropper-crop-box {
    border: 3px solid #4caf50;
    box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}
</style>