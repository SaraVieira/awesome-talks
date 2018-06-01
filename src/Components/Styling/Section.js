import styled from 'styled-components'
import remcalc from 'remcalc'

export const Section = styled.div`
    @media (max-width: ${remcalc(768)}) {
        margin: auto;
        left: ${remcalc(-70)};
        position: relative;
        top: ${remcalc(-65)};
    }
`
