const MAIN_ROUTES = {
    BUY:                "/buy",
    PURCHASED:          "/purchased"
}

const SUB_ROUTE = {
    INS_DEV:            "insurance_dev",
    INS_DESIGR:         "insurance_desigr",
  };

const getRouteName = (segments: string[]) => segments.join("/");

export const ROUTES = {
    BUY_INS_DEV: getRouteName([MAIN_ROUTES.BUY, SUB_ROUTE.INS_DEV]),
    BUY_INS_DESIGNR: getRouteName([MAIN_ROUTES.BUY, SUB_ROUTE.INS_DESIGR]),
    PURCHASED: MAIN_ROUTES.PURCHASED
}