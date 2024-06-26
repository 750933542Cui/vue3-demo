import { reactive, toRefs, ref, watch } from "vue";
import { setTabs, getTabs } from "@utils/storage";
import { useStore } from "vuex";

export function useTabsHook() {
    const store = useStore();
    const data = reactive({
        left: 0,
        tabs: getTabs(),
        activeMenu: "",
        disabledCurrent: true,
        disabledLeft: true,
        disabledRight: true,
        disabledOther: true,
        disabledAll: true,
    });

    data.tabs.forEach((item) => {
        if (item.active) data.activeMenu = item.id;
    });

    const tabsOut = ref(null);
    const tabsInner = ref(null);

    // tabs 左右滑动
    const handleScroll = (type) => {
        const num = 300;
        const outWidth = tabsOut.value.offsetWidth;
        const innerWidth = tabsInner.value.offsetWidth;
        if (innerWidth > outWidth) {
            if (type === "right") {
                if (outWidth - data.left < innerWidth - num) {
                    data.left -= num;
                } else {
                    data.left = outWidth - innerWidth;
                }
            } else {
                if (-data.left > num) {
                    data.left += num;
                } else {
                    data.left = 0;
                }
            }
        }
    };

    // 点击tab
    const handleTag = (obj) => {
        store.commit("getActiveMenu", obj.props.name);
        setTabs(data.tabs, obj.props.name);
        judgeTabs();
    };

    // 关闭tab
    const handleClose = (value) => {
        let idx = 0;
        let active = false;
        data.tabs.forEach((item, index) => {
            if (item.id === value) {
                idx = index;
                active = item.active;
            }
        });
        if (active) {
            handleMenuClose("current");
        } else {
            data.tabs.splice(idx, 1);
            setTabs(data.tabs);
            judgeTabs();
        }
    };

    // 显示tabs菜单
    const handleMenuClose = (type) => {
        let tabs = data.tabs;
        let currentIdx = 0;
        let menuId = "";
        tabs.forEach((item, index) => {
            if (item.active) currentIdx = index;
        });
        if (type === "current") {
            currentIdx = currentIdx > 0 ? currentIdx - 1 : currentIdx + 1;
            menuId = tabs[currentIdx]?.id ?? "";
            tabs = tabs.filter((item) => !item.active);
            store.commit("getActiveMenu", menuId);
        } else if (type === "other") {
            tabs = tabs.filter((item) => item.active);
            data.tabs = tabs;
        } else if (type === "all") {
            tabs = tabs.filter((item) => item.unCloseable);
            store.commit("getActiveMenu", "");
        } else {
            let len = tabs.length - 1;
            type === "left"
                ? tabs.splice(0, currentIdx)
                : tabs.splice(currentIdx + 1, len - currentIdx);
        }
        setTabs(tabs, menuId);
        judgeTabs();
    };

    // 判断是否可关闭导航栏
    const judgeTabs = () => {
        let disabledCurrent = true;
        let disabledLeft = true;
        let disabledRight = true;
        let idx = 0;
        let len = data.tabs.length;
        data.tabs.forEach((item, index) => {
            if (item.active && !item.unCloseable) disabledCurrent = false;
            if (item.active) idx = index;
        });
        if (idx > 0) {
            for (let i = 0; i < idx; i++) {
                if (!data.tabs[i].unCloseable) {
                    disabledLeft = false;
                    break;
                }
            }
        }
        if (idx + 1 < len) {
            for (let i = len; i > idx + 1; i--) {
                if (!data.tabs[i - 1].unCloseable) {
                    disabledRight = false;
                    break;
                }
            }
        }

        data.disabledCurrent = disabledCurrent;
        data.disabledLeft = disabledLeft;
        data.disabledRight = disabledRight;
        data.disabledOther = disabledLeft && disabledRight;
        data.disabledAll = disabledLeft && disabledRight && disabledCurrent;
    };
    judgeTabs();

    watch(
        () => store.state.activeMenu,
        (value, old) => {
            data.activeMenu = value;
            data.tabs = getTabs();
            judgeTabs();
        }
    );

    return {
        ...toRefs(data),
        tabsOut,
        tabsInner,
        handleScroll,
        handleTag,
        handleClose,
        handleMenuClose,
    };
}