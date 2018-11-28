/**
 * @func 存取cookie工具函数
 */
export const getCookie = name => {
    try {
        const arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));

        if (arr != null) return unescape(arr[2]);

        return null;
    } catch (error) {
        console.error(error);

        throw error;
    }
};
