<template>
    <div class="headers_from">
        <el-table
            v-loading="loading"
            :data="orgTableData"
            :header-cell-style="{ background: '#f5f7fa', color: '#666' }"
            stripe
            border
        >
            <el-table-column prop="number" label="序号" width="80" type="index" align="center" />

            <el-table-column
                label="访问（人）"
                prop="visitPersonCnt"
                show-overflow-tooltip
                align="center"
            >
            </el-table-column>
            <el-table-column
                label="访问（次）"
                prop="visitCnt"
                show-overflow-tooltip
                align="center"
            >
            </el-table-column>
            <el-table-column
                label="案件搜索（次）"
                prop="caseSearchCnt"
                show-overflow-tooltip
                align="center"
            >
            </el-table-column>
            <el-table-column label="自定义标签" align="center">
                <el-table-column label="访问（次）" prop="diyRemarkCnt" align="center" />
                <el-table-column label="通过（组）" prop="diyRemarkPassCnt" align="center" />
                <el-table-column label="不通过（组）" prop="diyRemarkNotPassCnt" align="center" />
            </el-table-column>
            <el-table-column
                label="量刑参考访问（次）"
                prop="allEvidenceCheckCnt"
                show-overflow-tooltip
                align="center"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'headers_from',
    components: {},
    data() {
        return {
            orgTableData: [
                {
                    visitPersonCnt: 100,
                    visitCnt: 110,
                    caseSearchCnt: 120,
                    diyRemarkCnt: 130,
                    diyRemarkPassCnt: 140,
                    diyRemarkNotPassCnt: 150,
                    allEvidenceCheckCnt: 160,
                },
            ],
            tableColumns: [
                { key: 'visitPersonCnt', name: '访问（人）', minWidth: 90 },
                { key: 'visitCnt', name: '访问（次）', minWidth: 90 },
                { key: 'caseSearchCnt', name: '案件搜索（次）', minWidth: 90 },
                {
                    name: '自定义标签',
                    children: [
                        { key: 'diyRemarkCnt', name: '访问（次）', minWidth: 90 },
                        { key: 'diyRemarkPassCnt', name: '通过（组）', minWidth: 90 },
                        { key: 'diyRemarkNotPassCnt', name: '不通过（组）', minWidth: 95 },
                    ],
                },
                { key: 'allEvidenceCheckCnt', name: '量刑参考访问（次）', minWidth: 90 },
            ],
        }
    },
    methods: {},
}
</script>

<style lang="scss" scoped></style>
