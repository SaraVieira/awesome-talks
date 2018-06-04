import { buildSchema } from 'graphql'

export default buildSchema(`
    type Asset @model {
    createdAt: String!
    fileName: String!
    handle: String! @isUnique
    height: Float
    id: ID! @isUnique
    mimeType: String
    size: Float
    speakersPhoto: [Speakers!]! @relation(name: "AssetSpeakersPhoto")
    updatedAt: String!
    url: String! @isUnique
    width: Float
    }

    enum Category {
    CSS
    JavaScript
    React
    Angular
    VR
    AR
    Vue
    PWA
    React_Native
    Electron
    Inspirational
    Animations
    A11y
    Personal
    Story
    Design
    Design_Systems
    Elm
    ReasonML
    GraphQL
    NodeJS
    }

    enum Continents {
    Africa
    Europe
    Asia
    Australia
    North_America
    South_America
    }

    enum Countries {
    Albania
    Austria
    Afghanistan
    Algeria
    Andorra
    Angola
    Antigua_and_Barbuda
    Argentina
    Armenia
    Australia
    Azerbaijan
    Bahamas
    Bahrain
    Bangladesh
    Barbados
    Belarus
    Belgium
    Belize
    Benin
    Bhutan
    Bolivia
    Bosnia_and_Herzegovina
    Botswana
    Brazil
    Brunei
    Bulgaria
    Burkina_Faso
    Burundi
    Cote_dIvoire
    Cabo_Verde
    Cambodia
    Cameroon
    Canada
    Central_African_Republic
    Chad
    Chile
    China
    Colombia
    Comoros
    Congo
    Costa_Rica
    Croatia
    Cuba
    Cyprus
    Czech_Republic
    Democratic_Republic_of_the_Congo
    Denmark
    Djibouti
    Dominica
    Dominican_Republic
    Ecuador
    Egypt
    El_Salvador
    Equatorial_Guinea
    Eritrea
    Estonia
    Ethiopia
    Fiji
    Finland
    France
    Gabon
    Gambia
    Georgia
    Germany
    Gana
    Greece
    Grenada
    Guatemala
    Guinea
    Guinea_Bissau
    Guyana
    Haiti
    Honduras
    Hungary
    Iceland
    India
    Iran
    Iraq
    Indonesia
    Ireland
    Israel
    Italy
    Jamaica
    Japan
    Jordan
    Kazakhstan
    Kenya
    Kiribati
    Kuwait
    Kyrgyzstan
    Laos
    Latvia
    Lebanon
    Lesotho
    Liberia
    Libya
    Liechtenstein
    Lithuania
    Luxembourg
    Macedonia
    Madagascar
    Malawi
    Malaysia
    Maldives
    Mali
    Malta
    Marshall_Islands
    Mauritania
    Mauritius
    Mexico
    Micronesia
    Moldova
    Monaco
    Mongolia
    Montenegro
    Morocco
    Mozambique
    Myanmar
    Namibia
    Nauru
    Nepal
    Netherlands
    New_Zealand
    Nicaragua
    Niger
    Nigeria
    North_Korea
    Norway
    Oman
    Pakistan
    Palau
    Palestine_State
    Panama
    Papua_New_Guinea
    Paraguay
    Peru
    Philippines
    Poland
    Portugal
    Qatar
    Romania
    Russia
    Rwanda
    Saint_Kitts_and_Nevis
    Saint_Lucia
    Saint_Vincent_and_the_Grenadines
    Samoa
    San_Marino
    Sao_Tome_and_Principe
    Saudi_Arabia
    Senegal
    Serbia
    Seychelles
    Sierra_Leone
    Singapore
    Slovakia
    Slovenia
    Solomon_Islands
    Somalia
    South_Africa
    South_Korea
    South_Sudan
    Spain
    Sri_Lanka
    Sudan
    Suriname
    Swaziland
    Sweden
    Switzerland
    Syria
    Tajikistan
    Tanzania
    Thailand
    Timor_Leste
    Togo
    Tonga
    Trinidad_and_Tobago
    Tunisia
    Turkey
    Turkmenistan
    Tuvalu
    Uganda
    Ukraine
    United_Arab_Emirates
    United_Kingdom
    United_States_of_America
    Uruguay
    Uzbekistan
    Vanuatu
    Venezuela
    Vietnam
    Yemen
    Zambia
    Zimbabwe
    }

    type File @model {
    contentType: String!
    createdAt: String!
    id: ID! @isUnique
    name: String!
    secret: String! @isUnique
    size: Int!
    updatedAt: String!
    url: String! @isUnique
    }

    enum Locales {
    EN_US
    }

    type SpeakerTopic @model {
    createdAt: String!
    id: ID! @isUnique
    isPublished: Boolean! @defaultValue(value: false)
    speakers: [Speakers!]! @relation(name: "Topics")
    topic: String @isUnique
    updatedAt: String!
    }

    type Speakers @model {
    bio: String @isUnique
    city: String
    continent: Continents
    country: Countries
    createdAt: String!
    id: ID! @isUnique
    isPublished: Boolean! @defaultValue(value: false)
    name: String! @isUnique
    photo: Asset @relation(name: "AssetSpeakersPhoto")
    topics: [SpeakerTopic!]! @relation(name: "Topics")
    twitter: String
    updatedAt: String!
    videoses: [Videos!]! @relation(name: "Speaker")
    }

    type Tags @model {
    createdAt: String!
    id: ID! @isUnique
    isPublished: Boolean! @defaultValue(value: false)
    name: String @isUnique
    updatedAt: String!
    videos: [Videos!]! @relation(name: "Tags")
    }

    type User @model {
    createdAt: String!
    id: ID! @isUnique
    updatedAt: String!
    }

    type Videos @model {
    createdAt: String!
    description: String
    id: ID! @isUnique
    isPublished: Boolean! @defaultValue(value: false)
    link: String! @isUnique
    moderatorNotes: String
    name: String!
    speaker: [Speakers!]! @relation(name: "Speaker")
    tags: [Tags!]! @relation(name: "Tags")
    updatedAt: String!
    }

    type Query {
        allTagses: [Tags]
        allSpeakerses: [Speakers],
        allVideoses(first: Int, after: String, search: String): [Videos]
    }
`)
