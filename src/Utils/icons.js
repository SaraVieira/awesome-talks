import { library, config } from '@fortawesome/fontawesome-svg-core'

import {
    faTimes,
    faSearch,
    faChevronRight,
    faChevronLeft,
    faChevronDown,
    faChevronUp,
    faMoon,
    faSun
} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false

library.add(
    faSearch,
    faTimes,
    faChevronRight,
    faChevronLeft,
    faChevronUp,
    faChevronDown,
    faMoon,
    faSun
)
