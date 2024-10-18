<template>
    <!-- 雪花节点 -->
    <div class="snow-container"></div>
</template>

<script>
export default {
    async mounted() {
        await this.sleep(2000)
        this.show({
            minSize: 5, //雪花的最小尺寸
            maxSize: 15, //雪花的最大尺寸
            newOn: 400, //雪花出现的频率 这个数值越小雪花越多
        })
        this.clickWords()
    },
    methods: {
        // 点击 文字
        clickWords() {
            let fontAll = [
                'html',
                'css',
                'js',
                'ts',
                'node',
                'vue',
                'react',
                'uniapp',
                'rn',
                'wx',
                'fultter',
                'electron',
            ]
            let colorAll = [
                'red',
                'pink',
                'yellow',
                'blue',
                'aqua',
                'green',
                'gold',
                'brown',
                'grey',
                'orange',
            ]
            $(document).click(function (e) {
                var $span = $(
                    '<span class="show-words">' +
                        fontAll[Math.floor(Math.random() * fontAll.length)] +
                        '</span>',
                )
                $('.snow-container').append($span)
                $span.css('color', colorAll[Math.floor(Math.random() * colorAll.length)])
                var width = $span.width()
                var height = $span.height()
                var init = e.pageY - height / 2
                $span.css({
                    left: e.pageX - width / 2 + 'px',
                    top: init + 'px',
                })
                $span.animate(
                    {
                        fontsize: 10 + 'px',
                        top: init - 150 + 'px',
                        opacity: 0.2,
                    },
                    1000,
                    function () {
                        $span.css('display', 'none')
                    },
                )
            })
        },

        // 雪花
        show(options) {
            var $flake = $('<div id="snowbox" />')
                    .css({ position: 'absolute', top: '-50px' })
                    .html('&#10052;'),
                documentHeight = $(document).height(),
                documentWidth = $(document).width(),
                defaults = {
                    minSize: 10,
                    maxSize: 20,
                    newOn: 1000,
                    flakeColor: '#fcfcfc',
                },
                options = $.extend({}, defaults, options)

            var interval = setInterval(function () {
                var startPositionLeft = Math.random() * documentWidth - 100,
                    startOpacity = 0.5 + Math.random(),
                    sizeFlake = options.minSize + Math.random() * options.maxSize,
                    endPositionTop = documentHeight - 40,
                    endPositionLeft = startPositionLeft - 100 + Math.random() * 500,
                    durationFall = documentHeight * 10 + Math.random() * 5000
                $flake
                    .clone()
                    .appendTo('.snow-container')
                    .css({
                        left: startPositionLeft,
                        opacity: startOpacity,
                        'font-size': sizeFlake,
                        color: options.flakeColor,
                    })
                    .animate(
                        {
                            top: endPositionTop,
                            left: endPositionLeft,
                            opacity: 0.2,
                        },
                        durationFall,
                        'linear',
                        function () {
                            $(this).remove()
                        },
                    )
            }, options.newOn)
        },
    },
}
</script>
