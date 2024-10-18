// 使用 validate.js 进行验证
const validationErrors = validator.validate(data)

if (validationErrors) {
    // 如果有验证错误，处理它们
    console.error('验证失败:', validationErrors)
    // 你可以根据需要在这里显示错误信息给用户
} else {
    // 如果没有验证错误，表单可以提交
    console.log('表单验证通过，可以提交')
    // 在这里处理表单提交逻辑，例如通过 AJAX 发送数据到服务器
}
