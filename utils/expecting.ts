import { debounce } from "lodash"
import toast from "react-hot-toast"

export const expectFunc = debounce(() => {
    toast('开发中...敬请期待！', {
        icon: '😊😘',
    })
}, 300)