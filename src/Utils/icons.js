import fontawesome from '@fortawesome/fontawesome'

import faTimes from '@fortawesome/fontawesome-free-solid/faTimes'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import faChevronRight from '@fortawesome/fontawesome-free-solid/faChevronRight'
import faChevronleft from '@fortawesome/fontawesome-free-solid/faChevronleft'
fontawesome.config = {
    autoAddCss: false
}

fontawesome.library.add(faSearch, faTimes, faChevronRight, faChevronleft)
