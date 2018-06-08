import remcalc from 'remcalc'

export default {
    LIGHT: {
        main: '#000',
        primary: '#fff',
        secondary: '#666',
        tertiary: '#8A000000',
        cinema: '#d62d22',
        lightGrey: '#e6e9ec',
        midGrey: '#888',
        red: '#ff4949',
        green: '#4ccd88',
        blue: '#337294',
        shadow: `0 ${remcalc(10)} ${remcalc(20)} rgba(0, 0, 0, 0.1),
        0 ${remcalc(6)} ${remcalc(6)} rgba(0, 0, 0, 0.12);`,
        lightBlue: '#168fd0',
        bottomShadow:
            '0 2px 6px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08)'
    },
    DARK: {
        main: '#fff',
        primary: '#000',
        secondary: '#80FFFFFF',
        tertiary: '#1FFFFFFF',
        cinema: '#fa8f88',
        lightGrey: '#e6e9ec',
        midGrey: '#888',
        red: '#ff4949',
        green: '#4ccd88',
        blue: '#B3FFFFFF',
        shadow: `0 ${remcalc(10)} ${remcalc(20)} rgba(0, 0, 0, 0.1),
        0 ${remcalc(6)} ${remcalc(6)} rgba(0, 0, 0, 0.12);`,
        lightBlue: '#168fd0',
        bottomShadow:
            '0 2px 6px 0 rgba(0, 0, 0, 0.12), 0 2px 4px 0 rgba(0, 0, 0, 0.08)'
    }
}
