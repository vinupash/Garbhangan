export const COLORS = {
    brand: {
        primary: "#051e5e",
        secondary: "#204093",
        background: "#F8E7D5",
        black: '#000000',
    }
}

export const SIZES = {
    base: 10,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    mediumLarge: 24,
    extraLarge: 28,
    xl: 32,
    xxl: 40,
    xxxl: 80,
}

export const FONT = {
    Charlatan: 'Charlatan',
    MartelSansBlack: 'MartelSans-Black',
    MartelSansBold: 'MartelSans-Bold',
    MartelSansExtraBold: 'MartelSans-ExtraBold',
    MartelSansExtraLight: 'MartelSans-ExtraLight',
    MartelSansLight: 'MartelSans-Light',
    MartelSansRegular: 'MartelSans-Regular',
    MartelSansSemiBold: 'MartelSans-SemiBold',
    FourCAbhishek: 'Four-C-Abhishek',
    FourCAbhishekBold: 'Four-C-AbhishekBold',
    FourCAbhishekhead: 'Four-C-Abhishekhead',
}

export const SHADOWS = {
    light: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    lightPrimary: {
        shadowColor: COLORS.brand.primary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    lightSecondary: {
        shadowColor: COLORS.brand.secondary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    medium: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    dark: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
};