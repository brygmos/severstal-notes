import {ThemeType} from "../../types";
export function setTheme(theme?: ThemeType) {
    if(!theme) {
        document.body.classList.toggle('app_dark_theme')
        return
    }
    theme === ThemeType.DARK
        ? document.body.classList.add('app_dark_theme')
        : document.body.classList.remove('app_dark_theme')
}

export function getTheme() {
    return document.body.classList.contains('app_dark_theme') ? ThemeType.DARK : ThemeType.LIGHT
}
