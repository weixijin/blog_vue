// 创建未开始 进行中 已结束 暂停
export const statusObj = {
    1: '未开始',
    2: '进行中',
    3: '已结束',
    4: '暂停',
}

// 获取状态标签
export function getStatusLabel(status) {
    return statusObj[status] || '未知状态'
}
