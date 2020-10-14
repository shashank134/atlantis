import theme from "@jobber/docz-theme/theme/index";

export const wrapper = { px: 5, py: 4 };

export const mainLink = (variation = "heading") => {
  return {
    ...theme.navigation[variation],
    mb: variation === "heading" ? 2 : 0,
  };
};

export const subNav = {
  pl: 3,
};

export const subLink = (variation = "heading") => {
  return {
    ...theme.navigation.arrow,
    pl: variation === "heading" ? 0 : 4,
  };
};
