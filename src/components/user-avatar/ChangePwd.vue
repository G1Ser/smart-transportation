<template>
    <el-dialog v-model="formVisible" title="修改密码" width="500" :modal="false" :align-center="true" center
        :close-on-click-modal="false" class="form-dialog" modal-class="dialog-modal" @close="emits('close-dialog')">
        <el-form :model="form" :label-position="labelPosition" label-width="auto" ref="ruleFormRef" :rules="rules">
            <el-form-item label="旧密码：" prop="old_password">
                <el-input v-model="form.old_password" placeholder="请输入旧密码" size="large" />
            </el-form-item>
            <el-form-item label="新密码：" prop="new_password">
                <el-input v-model="form.new_password" type="password" show-password placeholder="请输入新密码" size="large" />
            </el-form-item>
            <el-form-item label="确认密码：" prop="re_password">
                <el-input v-model="form.re_password" type="password" show-password placeholder="请输入确认密码" size="large" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="changePwd">
                    确定
                </el-button>
                <el-button @click="emits('close-dialog')">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { FormInstance, FormRules } from "element-plus";
import { debounce } from "lodash-es";
const formVisible = ref(true);
const form = reactive({
    old_password: '',
    new_password: '',
    re_password: ''
})
defineProps<{
    labelPosition: string
}>()
const emits = defineEmits(['close-dialog', 'change-password'])
const ruleFormRef = ref<FormInstance>();
interface RuleForm {
    old_password: string;
    new_password: string;
    re_password: string;
}
const validatePwd = (rule: any, value: string, callback: any) => {
    if (value !== form.new_password) {
        callback(new Error("两次输入密码不匹配"))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<RuleForm>>({
    old_password: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    new_password: [{ required: true, message: "请输入新密码", trigger: "blur" }, { min: 5, max: 16, message: '新密码必须是5-16位非空字符', trigger: 'blur' }],
    re_password: [
        { required: true, message: "请输入确认密码", trigger: "blur" },
        { validator: validatePwd, trigger: "blur" }
    ],
});
const debounceChangePwd = debounce(() => {
    emits('change-password', form)
}, 500)
const changePwd = () => {
    if (!ruleFormRef.value) return
    ruleFormRef.value.validate((valid) => {
        if (!valid) return
        debounceChangePwd()
    })
}
</script>

<style lang="scss" scoped></style>