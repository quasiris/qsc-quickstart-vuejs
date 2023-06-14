// Locale
// import { en } from '../../locale'

export const themeConfig = {
  disableCustomizer: false, // options[Boolean] : true, false(default)
  rtl: false, // options[Boolean] : true, false(default)
  verticalSidebarMini: false, // options[Boolean] : true, false(default)
  verticalSidebarDrawer: true, // options[Boolean] : true, false(default)
  verticalCompactSidebarDrawer: true, // options[Boolean] : true, false(default)
  verticalSaasSidebarDrawer: true, // options[Boolean] : true, false(default)
  showBreadcrumb: true, // options[Boolean] : true, false(default)

  layout: "VerticalSidebar", //VerticalCompactSidebar,VerticalSaasLayout,VerticalSidebar,HorizontalBar
  isLoading: false,

  isDark: false,
  verticalSidebarDrawerColor: "dark", // primary,white,sucsess,warning,etc
  appBarColor: "white" // primary,white,sucsess,warning,etc
};

export const themePreset = {
  breakpoint: {
    thresholds: {
      xs: 340,
      sm: 540,
      md: 960,
      lg: 1600
    },
    scrollBarWidth: 10
  },

  //   icons: {
  //     iconfont: 'mdi',
  //     values: {},
  //   },
  //   lang: {
  //     current: 'en',
  //     locales: { en },nav
  //     t: undefined as any,
  //   },
  rtl: false,

  theme: {
    dark: themeConfig.isDark,

    default: "light",
    disable: false,
    options: {
      cspNonce: undefined,
      customProperties: true,
      minifyTheme: undefined,
      themeCache: undefined
    },
    themes: {
      light: {
        primary: "#D23F57",
        secondary: "#0F3460",
        success: "#33D067",
        danger: "#FF5353",
        warning: "#FFCD4E",
        warning: "#FF8A48",
        info: "#5e5ce6",
        dark: "#242939",
        black: "#242939",
        background: "#f2f3f8",
        color: "#0F3460",
        grey: "#AEB4BE"
      },
      dark: {
        primary: "#D23F57 ",
        secondary: "#0F3460",
        success: "#33D067",
        danger: "#FF5353",
        warning: "#FFCD4E",
        info: "#5e5ce6",
        warning: "#FF8A48",
        color: "#fff",
        grey: "#AEB4BE"
      }
    }
  }
};
